use rand::Rng;
use chrono::{DateTime, Local};
use std::error::Error;
use std::fmt;
use regex::Regex;


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
    result_list: Vec<i32>,
    result_total: i32,
}

impl Roll {
    pub fn new(description: &str, result_list: Vec<i32>, result_total: i32) -> Self {
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
            // regex strExpr ("[1-9][0-9]*(d[1-9][0-9]*)?([\\+\\-][1-9][0-9]*(d[1-9][0-9]*)?)*");
            let re = Regex::new(r"^[1-9][0-9]*(d[1-9][0-9]*)?([\\+\\-][1-9][0-9]*(d[1-9][0-9]*)?)*$").unwrap();
            if re.is_match(roll_str) {
                println!("roll_str ok");
            } else {
                println!("roll_str_error");
            }
            //TODO: parse roll_str into a vector of unary rolls and operands
            //TODO: convert rolls to values
            Ok(Roll::new(roll_str, vec![], 0))
        } else {
            Err(RollError::EmptyRollStr)
        }
    }
}
