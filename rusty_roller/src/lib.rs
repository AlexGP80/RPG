use rand::Rng;
use chrono::{DateTime, Local};
use std::error::Error;
use std::fmt;


#[derive(Debug)]
enum RollError {
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

struct Roll {
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

struct Roller {
    roll_list: Vec<Roll>,
}

impl Roller {
    pub fn new() -> Self {
        Self {
            roll_list: vec![],
        }
    }

    pub fn roll(roll_str: &str) -> Result<Roll, RollError> {
        if roll_str.len() > 0 {
            //TODO: Check format of roll_str
            //TODO: parse roll_str into a vector of unary rolls and operands
            //TODO: convert rolls to values
            Ok(Roll::new(roll_str, vec![], 0))
        } else {
            Err(RollError::EmptyRollStr)
        }
    }
}
