use rusty_roller::{Roller, Roll, RollError};

fn main() {
    let mut roller = Roller::new();
    roller.roll("1d6+3+2d4-17+6d6");
}
