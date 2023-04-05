package com.sk.expense.expense;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
public class ExpenseController {

    @Autowired
    ObjectMapper mapper;

    public static final String[] monthArr = {"", "Jan", "Feb", "March", "Apr", "may", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"};

    private String getFileName() {
        LocalDate date = LocalDate.now();
        String fileName = monthArr[date.getMonthValue()];
        log.info("current file name {}", fileName);
        return fileName + ".json";
    }


    @GetMapping("/history")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Transaction>> getHistory() throws IOException {
        log.info("start getHistory");

        File file = new File(getFileName());
        if (file.exists()) {
            try {
                Transaction[] traArr = mapper.readValue(file, Transaction[].class);
                List<Transaction> transactions = Arrays.asList(traArr);
                if (transactions.isEmpty()) {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                } else {
                    Collections.sort(transactions, Collections.reverseOrder());
                    return new ResponseEntity<>(transactions, HttpStatus.OK);
                }
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            file.createNewFile();
            log.error("{} File not found", file.getName());
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/addtransaction")
    public ResponseEntity<ApiResponse> addTransaction(@RequestBody Transaction transaction) throws IOException {
        log.info("start addtransaction {}", transaction);
        List<Transaction> transactionList = new ArrayList<>();

        if (!StringUtils.hasLength(transaction.getSource()) || !StringUtils.hasLength(transaction.getCategory())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        try {

            File file = new File(getFileName());

            try {
                transactionList = mapper.readValue(file, List.class);
            } catch (Exception e) {
                transactionList = new ArrayList<>();
            }
            transaction.setId(transactionList.size() + 1);
            transactionList.add(transaction);

            String transStr = mapper.writeValueAsString(transactionList);

            if (file.exists()) {
                file.delete();
            }
            try (FileWriter fw = new FileWriter(file)) {
                fw.write(transStr);
            }

            return new ResponseEntity<>(new ApiResponse("SUCCESS", HttpStatus.OK), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
        }


    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping(path = "/deleteTransaction")
    public ResponseEntity<ApiResponse> deleteTransaction(@RequestParam("id") Integer id) throws IOException {
        log.info("start delete transaction {}", id);
        List<Transaction> transactionList = new ArrayList<>();

        File file = new File(getFileName());
        try {
            Transaction [] trArr = mapper.readValue(file, Transaction [].class);
            transactionList =  Arrays.asList(trArr).stream().filter(x -> id != x.getId()).collect(Collectors.toList());
            String transStr = mapper.writeValueAsString(transactionList);
            if (file.exists()) {
                file.delete();
            }
            try (FileWriter fw = new FileWriter(file)) {
                fw.write(transStr);
            }
            return new ResponseEntity<>(new ApiResponse("SUCCESS", HttpStatus.OK), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse("FAILED", HttpStatus.BAD_REQUEST), HttpStatus.BAD_REQUEST);
        }
    }


}
