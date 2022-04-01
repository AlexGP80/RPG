use rand::Rng;
use chrono::Local;
use std::error::Error;
use std::fmt;
use regex::Regex;
use std::collections::HashMap;
// use std::time::{Duration, Instant};


#[derive(Debug)]
pub enum RollError {
    ParseRollStr(String),
    EmptyRollStr,
}

impl fmt::Display for RollError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        // Imports the variants to make the following code more compact.
        use RollError::*;
        match self {
            EmptyRollStr => write!(f, "empty input"),
            ParseRollStr(roll_str) => write!(f, "PARSE_ROLL_STR_ERROR: {}", roll_str),
        }
    }
}

impl Error for RollError {}

// TODO: Consider the lazy creation of each kind of roll needed (1d100, 3d6, 2d4+3, etc.) with
//        an associated RollResult struct storing the results of that kind of roll.
//        So the regex could be used in the creation of the Roll. Once created, you can "roll"
//        that kind of roll as many times as needed without having to create it each time, hence
//        without the need to use the regex to check the roll_str

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

    pub fn result(&self) -> i32 {
        self.result_total
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
        // let start = Instant::now();
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
        // println!("DEBUG: get_operands elapsed time: {:?}", Instant::now().duration_since(start));
        operands
    }


    // INFO: it was this function that was affecting performance
    // TODO: don't use this function, integrate the checking in the roll error processing
    //          returning meaningful errors when it encounters an error
    fn check_roll_format(&self, roll_str: &str) -> Result<(), RollError> {
        // let start = Instant::now();

        //TODO: Check format of roll_str: add drop lower, keep higher
        let re = Regex::new(r"^[1-9][0-9]*(d[1-9][0-9]*)?([\\+\\-][1-9][0-9]*(d[1-9][0-9]*)?)*$").unwrap();

        if !re.is_match(roll_str) {
            return Err(RollError::ParseRollStr(roll_str.to_string()));
        }
        // println!("DEBUG: check_roll_format elapsed time: {:?}", Instant::now().duration_since(start));
        Ok(())
    }

    pub fn roll(&mut self, roll_str: &str) -> Result<Roll, RollError> {
        //TODO: refactor, create smaller functions, call them from here
        if roll_str.len() == 0 {
            Err(RollError::EmptyRollStr)
        } else {
            // self.check_roll_format(roll_str)?;
            let operands: Vec<String> = self.get_operands(roll_str);
            // let start = Instant::now();

            let mut result_total = 0;

            let mut roll_list = HashMap::<String, Vec<i32>>::new();
            for operand in operands {
                if operand.contains("d") {
                    let parts: Vec<&str> = operand.split('d').collect();
                    if parts.len() == 2 {
                        let num_dice = parts[0];
                        let dice_faces = match parts[1].parse::<i32>() {
                            Ok(dice_faces) => dice_faces,
                            Err(e) => return Err(RollError::ParseRollStr(parts[1].to_string())), // FIXME: error message
                        };
                        let sign_mult = match num_dice.chars().next() {
                            Some('+') => 1,
                            Some('-') => -1,
                            _ => return Err(RollError::ParseRollStr(parts[1].to_string())), // FIXME: error message
                        };
                        let num_dice: i32 = match num_dice[1..].parse::<i32>() {
                            Ok(num_dice) => num_dice,
                            Err(e) => return Err(RollError::ParseRollStr(parts[1].to_string())), // FIXME: error message
                        };
                        let mut result_list = vec![];
                        for _ in 0..num_dice {
                            let mut result = sign_mult * rand::thread_rng().gen_range(1..(dice_faces+1));

                            result_total += result;
                            result_list.push(result);
                        }
                        roll_list.insert(operand.to_string(), result_list);
                    }
                } else {
                    let mut sign_mult = match operand.chars().next() {
                        Some('+') => 1,
                        Some('-') => -1,
                        _ => {
                            return Err(RollError::ParseRollStr(format!("Unable to get the string \
                                of the operand {}",operand.to_string())));
                        },
                    };
                    // let sign = operand.chars().next().unwrap(); // FIXME: unwrap
                    let value: i32 = match operand[1..].parse::<i32>() {
                        Ok(value) => value,
                        Err(e) => return Err(RollError::ParseRollStr(operand[1..].to_string())), // FIXME: error message
                    };
                    let value = sign_mult * value;
                    let mut result_list = vec![];
                    // if sign == '-' {
                    //     value *= -1;
                    // }
                    result_total += value;
                    result_list.push(value);
                    roll_list.insert(operand.to_string(), result_list);
                }
            }
            // println!("DEBUG: roll (after checking format and getting operands) elapsed time: {:?}", Instant::now().duration_since(start));
            Ok(Roll::new(roll_str, roll_list, result_total))
        }
    }
}
