package com.sk.expense;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Transaction implements  Comparable<Transaction> {

    @JsonProperty("id")
    private Integer id;

    @JsonProperty("source")
    private String source;

    @JsonProperty("amount")
    private float amount;

    @JsonProperty("category")
    private String category;

    @Override
    public int compareTo(Transaction transaction) {
        return this.getId() - transaction.getId() ;
    }
}
