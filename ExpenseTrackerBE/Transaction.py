from dataclasses import dataclass

@dataclass
class Transaction :
    def __init__(self, id, source, amount, category):
        self.id = id
        self.source = source
        self.amount = amount
        self.category = category

