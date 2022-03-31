use rusty_roller::Roller;

fn main() {
    let mut roller = Roller::new();
    let roll = roller.roll("1d6+3+2d4-17+6d6");
    match roll {
        Ok(roll) => println!("{:?}", roll),
        Err(e) => println!("ERROR: {:?}", e),
    }

}

fn check_randomness() {
    //FIXME: SLOOOOOOOOOOOW, I have to do some research
    const DIE_SIDES: usize = 100;
    const NUM_ROLLS: i32 = 10_000; // why less? :P

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
}
