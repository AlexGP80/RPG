use rand::Rng;
use chrono::Local;
use std::error::Error;
use std::fmt;
use regex::Regex;
use std::collections::HashMap;


#[derive(Debug)]
pub enum RollError {
    ParseRollStr{roll_str: String},
    EmptyRollStr,
}

impl fmt::Display for RollError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        // Imports the variants to make the following code more compact.
        use RollError::*;
        match self {
            EmptyRollStr => write!(f, "empty input"),
            ParseRollStr{roll_str} => write!(f, "error parsing the roll str: {}", roll_str),
        }
    }
}

impl Error for RollError {}

#[derive(Debug)]
pub struct Roll {
    datetime: String,
    description: String,
    result_list: HashMap<String, Vec<i32>>,
    result_total: i32,
}

impl Roll {
    pub fn new(description: &str, result_list: HashMap<String, Vec<i32>>, result_total: i32) -> Self {
        Self {
            datetime: format!("{}", Local::now()),
            description: String::from(description),
            result_list,
            result_total,
        }
    }
}

pub struct Roller {
    roll_list: Vec<Roll>,
}

impl Roller {
    pub fn new() -> Self {
        Self {
            roll_list: vec![],
        }
    }

    fn get_operands(&self, roll_str: &str) -> Vec<String> {
        let mut operands: Vec<String> = vec![];
        let gross: Vec<&str> = roll_str.split('+').collect();
        for item in gross {
            let gross_item: Vec<&str> = item.split('-').collect();
            let mut count = 0;
            for final_item in gross_item {
                if count == 0 {
                    operands.push(format!("+{}", final_item));
                } else {
                    operands.push(format!("-{}", final_item));
                }
                count += 1;
            }
        }
        operands
    }

    fn check_roll_format(&self, roll_str: &str) -> Result<(), RollError> {
        //TODO: Check format of roll_str: add drop lower, keep higher
        let re = Regex::new(r"^[1-9][0-9]*(d[1-9][0-9]*)?([\\+\\-][1-9][0-9]*(d[1-9][0-9]*)?)*$").unwrap();

        if !re.is_match(roll_str) {
            return Err(RollError::ParseRollStr{ roll_str: roll_str.to_string(), });
        }
        Ok(())
    }

    pub fn roll(&mut self, roll_str: &str) -> Result<Roll, RollError> {
        //TODO: refactor, create smaller functions, call them from here
        if roll_str.len() > 0 {
            self.check_roll_format(roll_str)?;
            let operands: Vec<String> = self.get_operands(roll_str);

            let mut result_total = 0;

            let mut roll_list = HashMap::<String, Vec<i32>>::new();
            for operand in operands {
                if operand.contains("d") {
                    let parts: Vec<&str> = operand.split('d').collect();
                    if parts.len() == 2 {
                        let num_dice = parts[0];
                        let dice_faces: i32 = parts[1].parse::<i32>().unwrap(); //FIXME: unwrap
                        let sign = num_dice.chars().next().unwrap(); // FIXME: unwrap
                        let num_dice: i32 = num_dice[1..].parse::<i32>().unwrap(); //FIXME: unwrap
                        let mut result_list = vec![];
                        for _ in 0..num_dice {
                            let mut result = rand::thread_rng().gen_range(1..(dice_faces+1));
                            if sign == '-' {
                                result *= -1;
                            }
                            result_total += result;
                            result_list.push(result);
                        }
                        roll_list.insert(operand.to_string(), result_list);
                    }
                } else {
                    let sign = operand.chars().next().unwrap(); // FIXME: unwrap
                    let mut value: i32 = operand[1..].parse::<i32>().unwrap(); //FIXME: unwrap
                    let mut result_list = vec![];
                    if sign == '-' {
                        value *= -1;
                    }
                    result_total += value;
                    result_list.push(value);
                    roll_list.insert(operand.to_string(), result_list);
                }
            }

            Ok(Roll::new(roll_str, roll_list, result_total))
        } else {
            Err(RollError::EmptyRollStr)
        }
    }
}
