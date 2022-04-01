use rusty_roller::Roller;
use std::time::{Duration, Instant};


fn main() {
    let mut roller = Roller::new();
    let roll = roller.roll("1d6+3+2d4-17+6d6");
    match roll {
        Ok(roll) => println!("{:?}", roll),
        Err(e) => println!("ERROR: {:?}", e),
    }

    check_randomness();

}

fn check_randomness() {
    let start = Instant::now();
    // It was the regex checking that was causing the huge bottleneck
    const DIE_SIDES: usize = 100;
    const NUM_ROLLS: i32 = 100_000;

    let mut roller = Roller::new();
    // I'm going to ignore pos 0 for simplicity sake
    let mut scores = [0; (DIE_SIDES as usize)+1];

    for _ in 1..NUM_ROLLS {
        let roll = roller.roll(&format!("1d{}", DIE_SIDES));
        match roll {
            Ok(roll) => {
                let result = roll.result() as usize;
                scores[result] += 1;
            },
            Err(e) => println!("ERROR: {:?}", e),
        }


    }

    println!("scores: {:?}", scores);
    //TODO: some statistics (typical deviation, max deviation, median, mode, etc)
    println!("DEBUG: check_randomness elapsed time: {:?}", Instant::now().duration_since(start));
}
