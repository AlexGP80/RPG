use rand::Rng;
use chrono::{DateTime, Local};
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

    pub fn roll(&mut self, roll_str: &str) -> Result<Roll, RollError> {
        if roll_str.len() > 0 {
            //TODO: Check format of roll_str
            let re = Regex::new(r"^[1-9][0-9]*(d[1-9][0-9]*)?([\\+\\-][1-9][0-9]*(d[1-9][0-9]*)?)*$").unwrap();

            //FIXME: delete println!s, check only for the error
            if re.is_match(roll_str) {
                println!("roll_str ok");
            } else {
                println!("roll_str_error");
                return Err(RollError::ParseRollStr{ roll_str: roll_str.to_string(), });
            }

            let mut result_total = 0;


            // 1. split and collect by '+' to get the gross vector
            // 2. traverse the gross vector and split/collect by '-'
            //    (NOT)- Of the resulting vector, the first element goes to the adding vector
            //     (NOT) - The rest of the elements go to the substracting vector
            //FIXME: maybe it's better to use only a vector and split keeping the sign, so the order is maintained
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
            let mut roll_list = HashMap::<String, Vec<i32>>::new();
            //let secret_number = rand::thread_rng().gen_range(1..101);
            for operand in operands {
                println!("Operand: {}", operand);
                // let operand_str = operand.to_string;
                if operand.contains("d") {
                    let parts: Vec<&str> = operand.split('d').collect();
                    if parts.len() == 2 {
                        let mut num_dice = parts[0];
                        // println("num_dice: {}", num_dice);
                        let dice_faces: i32 = parts[1].parse::<i32>().unwrap(); //FIXME: unwrap
                        let sign = num_dice.chars().next().unwrap(); // FIXME: unwrap
                        let num_dice: i32 = num_dice[1..].parse::<i32>().unwrap(); //FIXME: unwrap
                        // let num_dice: i32 = num_dice.parse::<i32>().unwrap(); //FIXME: unwrap
                        let mut result_list = vec![];
                        for _ in 0..num_dice {
                            let result = rand::thread_rng().gen_range(1..(dice_faces+1));
                            result_list.push(result);
                            match sign {
                                '+' => result_total += result,
                                '-' => result_total -= result,
                                _ => (), // FIXME: return appropiate error
                            }
                        }
                        roll_list.insert(operand.to_string(), result_list);
                    }
                } else {
                    let sign = operand.chars().next().unwrap(); // FIXME: unwrap
                    let value: i32 = operand[1..].parse::<i32>().unwrap(); //FIXME: unwrap
                    let mut result_list = vec![];
                    result_list.push(value);
                    roll_list.insert(operand.to_string(), result_list);
                    match sign {
                        '+' => result_total += value,
                        '-' => result_total -= value,
                        _ => (), // FIXME: return appropiate error
                    }
                }
            }

            Ok(Roll::new(roll_str, roll_list, result_total))
        } else {
            Err(RollError::EmptyRollStr)
        }
    }
}
