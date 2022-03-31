use rusty_roller::Roller;

fn main() {
    let mut roller = Roller::new();
    let roll = roller.roll("1d6+3+2d4-17+6d6");
    match roll {
        Ok(roll) => println!("{:?}", roll),
        Err(e) => println!("ERROR: {:?}", e),
    }
}
