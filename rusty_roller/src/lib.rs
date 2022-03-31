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
            if re.is_match(roll_str) {
                println!("roll_str ok");
            } else {
                println!("roll_str_error");
            }

            let result_total = 0;
            //TODO: parse roll_str into a vector of unary rolls and operands


            // 1. split and collect by '+' to get the gross vector
            // 2. traverse the gross vector and split/collect by '-'
            //    - Of the resulting vector, the first element goes to the adding vector
            //      - The rest of the elements go to the substracting vector
            //FIXME: maybe it's better to use only a vector and split keeping the sign, so the order is maintained
            let mut operands: Vec<String> = vec![];
            let gross: Vec<&str> = roll_str.split('+').collect();
            for item in gross {
                let gross_item: Vec<&str> = item.split('-').collect();
                let count = 0;
                for final_item in gross_item {
                    if count == 0 {
                        operands.push(format!("+{}", final_item));
                    } else {
                        operands.push(format!("-{}", final_item));
                    }
                }
            }
            let mut roll_list = HashMap::<String, Vec<i32>>::new();
            //let secret_number = rand::thread_rng().gen_range(1..101);
            for operand in operands {
                let parts: Vec<&str> = operand.split('d').collect();
                if parts.len() != 2 {
                    //FIXME: Return an appropiate Error
                    ()
                } else {
                    //FIXME: get the sign
                    let mut num_dice = parts[0];
                    let dice_faces: i32 = parts[1]; //FIXME: parse to int
                    let ch = num_dice.chars().next().unwrap(); // FIXME
                    let num_dice: i32 = &num_dice[1..]; //FIXME: parse to int
                    let result_list = vec![];
                    for _ in 1..num_dice {
                        let result = rand::thread_rng().gen_range(1..(dice_faces+1));
                        result_list.push(result);
                        result_total += result;
                    }
                    roll_list.insert(roll_str.to_string(), result_list);
                }
            }

            //TODO: convert rolls to values
            Ok(Roll::new(roll_str, HashMap::new(), 0))
        } else {
            Err(RollError::EmptyRollStr)
        }
    }
}
