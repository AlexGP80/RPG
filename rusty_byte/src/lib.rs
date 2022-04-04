use std::time::Instant;


pub enum Bit {
    Zero,
    One,
}

impl Bit {
    pub fn value(&self) -> i32 {
        match self {
            Bit::Zero => 0,
            Bit::One => 1,
        }
    }

    pub fn bit(value: u8) -> Option<Bit> {
        match value {
            0 => Some(B0),
            1 => Some(B1),
            _ => None,
        }
    }
}

const B0: Bit = Bit::Zero;
const B1: Bit = Bit::One;

#[derive(Clone)]
pub enum NumBit {
    POS7,
    POS6,
    POS5,
    POS4,
    POS3,
    POS2,
    POS1,
    POS0,
}

impl NumBit {
    pub fn pos(&self) -> u8 {
        match self {
            NumBit::POS0 => 0,
            NumBit::POS1 => 1,
            NumBit::POS2 => 2,
            NumBit::POS3 => 3,
            NumBit::POS4 => 4,
            NumBit::POS5 => 5,
            NumBit::POS6 => 6,
            NumBit::POS7 => 7,
        }
    }

    pub fn get(pos: u8) -> Option<NumBit> {
        match pos {
            0 => Some(NumBit::POS0),
            1 => Some(NumBit::POS1),
            2 => Some(NumBit::POS2),
            3 => Some(NumBit::POS3),
            4 => Some(NumBit::POS4),
            5 => Some(NumBit::POS5),
            6 => Some(NumBit::POS6),
            7 => Some(NumBit::POS7),
            _ => None,
        }
    }
}

#[derive(Debug, PartialEq, Clone)]
struct RustyByte {
    bits: u8,
}

impl RustyByte {
    fn new(init_value: u8) -> Self {
        Self {
            bits: init_value,
        }
    }
    pub fn value(&self) -> u8 {
        self.bits
    }

    pub fn get_bit(&self, bit_number: NumBit) -> u8 {
        (self.bits & (1_u8 << bit_number.pos())) >> bit_number.pos()
    }

    pub fn set_bit(&mut self, bit_number: NumBit, value: Bit) {
        self.bits = match value {
            Bit::Zero => {
                self.bits & !(1_u8 << bit_number.pos())
            },
            Bit::One => {
                self.bits | (1_u8 << bit_number.pos())
            }
        }
    }

    // TODO: Try to improve this to do it at once (get rid of the for loop)?
    pub fn get_bits(&self, bit_from: NumBit, bit_to: NumBit) -> u8 {
        let mut mask: u8 = 0;
        for i in bit_from.pos()..=bit_to.pos() {
            mask += 1_u8 << i;
        }
        (self.bits & mask) >> bit_from.pos()
    }

    // FIXME: Improve performance
    pub fn set_bits(&mut self, bit_from: NumBit, bit_to: NumBit, value: u8) {
        let mask = RustyByte::new(value << bit_from.pos());
        for i in bit_from.pos()..=bit_to.pos() {
            if let Some(num_bit) = NumBit::get(i) {
                if let Some(bit_value) = Bit::bit(mask.get_bit(num_bit.clone())) {
                    self.set_bit(num_bit, bit_value);
                }
            }
        }
    }

    //TODO: overload index operator (brackets)...
    // TODO: Check exec time for each method to see if there are bottlenecks
}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn test_num_bits() {
        assert_eq!(NumBit::POS0.pos(), 0);
        assert_eq!(NumBit::POS1.pos(), 1);
        assert_eq!(NumBit::POS2.pos(), 2);
        assert_eq!(NumBit::POS3.pos(), 3);
        assert_eq!(NumBit::POS4.pos(), 4);
        assert_eq!(NumBit::POS5.pos(), 5);
        assert_eq!(NumBit::POS6.pos(), 6);
        assert_eq!(NumBit::POS7.pos(), 7);
    }

    #[test]
    fn test_new_rusty_byte() {
        let my_byte = RustyByte::new(0);
        assert_eq!(my_byte.value(), 0);
    }

    #[test]
    fn test_get_bit() {
        let my_byte = RustyByte::new(1);
        assert_eq!(my_byte.get_bit(NumBit::POS0), 1);
        assert_eq!(my_byte.get_bit(NumBit::POS1), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS2), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS3), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS4), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS5), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS6), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS7), 0);
        let my_byte = RustyByte::new(10);
        assert_eq!(my_byte.get_bit(NumBit::POS0), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS1), 1);
        assert_eq!(my_byte.get_bit(NumBit::POS2), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS3), 1);
        assert_eq!(my_byte.get_bit(NumBit::POS4), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS5), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS6), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS7), 0);
        let my_byte = RustyByte::new(63);
        assert_eq!(my_byte.get_bit(NumBit::POS0), 1);
        assert_eq!(my_byte.get_bit(NumBit::POS1), 1);
        assert_eq!(my_byte.get_bit(NumBit::POS2), 1);
        assert_eq!(my_byte.get_bit(NumBit::POS3), 1);
        assert_eq!(my_byte.get_bit(NumBit::POS4), 1);
        assert_eq!(my_byte.get_bit(NumBit::POS5), 1);
        assert_eq!(my_byte.get_bit(NumBit::POS6), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS7), 0);
        let my_byte = RustyByte::new(128);
        assert_eq!(my_byte.get_bit(NumBit::POS0), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS1), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS2), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS3), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS4), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS5), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS6), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS7), 1);
        let my_byte = RustyByte::new(192);
        assert_eq!(my_byte.get_bit(NumBit::POS0), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS1), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS2), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS3), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS4), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS5), 0);
        assert_eq!(my_byte.get_bit(NumBit::POS6), 1);
        assert_eq!(my_byte.get_bit(NumBit::POS7), 1);
    }

    #[test]
    fn test_set_bit() {
        let mut my_byte = RustyByte::new(0);
        assert_eq!(my_byte.get_bit(NumBit::POS0), 0);
        assert_eq!(my_byte.value(), 0);

        my_byte.set_bit(NumBit::POS0, B1);
        assert_eq!(my_byte.get_bit(NumBit::POS0), 1);
        assert_eq!(my_byte.value(), 1);

        my_byte.set_bit(NumBit::POS1, B1);
        assert_eq!(my_byte.get_bit(NumBit::POS1), 1);
        assert_eq!(my_byte.value(), 3);

        my_byte.set_bit(NumBit::POS0, B0);
        assert_eq!(my_byte.get_bit(NumBit::POS0), 0);
        assert_eq!(my_byte.value(), 2);

        my_byte.set_bit(NumBit::POS7, B1);
        assert_eq!(my_byte.get_bit(NumBit::POS7), 1);
        assert_eq!(my_byte.value(), 130);

        my_byte.set_bit(NumBit::POS1, B0);
        assert_eq!(my_byte.get_bit(NumBit::POS1), 0);
        assert_eq!(my_byte.value(), 128);

        my_byte.set_bit(NumBit::POS6, B1);
        assert_eq!(my_byte.get_bit(NumBit::POS6), 1);
        assert_eq!(my_byte.value(), 192);
    }

    #[test]
    fn test_get_bits() {
        let mut my_byte = RustyByte::new(0b_0011_1100_u8);
        assert_eq!(my_byte.get_bits(NumBit::POS0, NumBit::POS2), 0b_100_u8);
        assert_eq!(my_byte.get_bits(NumBit::POS0, NumBit::POS3), 12_u8); //0b_1100
        assert_eq!(my_byte.get_bits(NumBit::POS2, NumBit::POS3), 3_u8);
        assert_eq!(my_byte.get_bits(NumBit::POS2, NumBit::POS5), 0xf_u8);
    }

    #[test]
    fn test_set_bits() {
        let mut my_byte = RustyByte::new(0_u8);
        my_byte.set_bits(NumBit::POS0, NumBit::POS2, 0b_101_u8);
        assert_eq!(my_byte.value(), 5_u8);
    }

    #[test]
    fn test_get_bit_elapsed_time() {
        let mut my_byte = RustyByte::new(0xc3_u8);

        let start = Instant::now();
        for _ in 1..1_000_000 {
            for i in 0..=7 {
                if let Some(num_bit) = NumBit::get(i) {
                    let _ = my_byte.get_bit(num_bit);
                }
            }
        }
        println!("DEBUG: get_bit elapsed time: {:?}", Instant::now().duration_since(start));
    }

    #[test]
    fn test_get_bits_elapsed_time() {
        let mut my_byte = RustyByte::new(0xc3_u8);

        let start = Instant::now();

        for _ in 1..1_000_000 {
            for i in 0..=4 {
                if let Some(from_bit) = NumBit::get(i) {
                    if let Some(to_bit) = NumBit::get(i+3) {
                        let _ = my_byte.get_bits(from_bit, to_bit);
                    }
                }
            }
        }
        println!("DEBUG: get_bit elapsed time: {:?}", Instant::now().duration_since(start));
    }

    #[test]
    fn test_set_bit_elapsed_time() {
        let mut my_byte = RustyByte::new(0_u8);

        let start = Instant::now();

        for _ in 1..1_000_000 {
            for i in 0..=7 {
                if let Some(num_bit) = NumBit::get(i) {
                    let value = match i%3 {
                        1 => B1,
                        _ => B0,
                    };
                    let _ = my_byte.set_bit(num_bit, value);
                }
            }
        }
        println!("DEBUG: set_bit elapsed time: {:?}", Instant::now().duration_since(start));
    }

    #[test]
    fn test_set_bits_elapsed_time() {
        let mut my_byte = RustyByte::new(0_u8);

        let start = Instant::now();

        for _ in 1..1_000_000 {
            for i in 0..=4 {
                if let Some(from_bit) = NumBit::get(i) {
                    if let Some(to_bit) = NumBit::get(i+3) {
                        let value = i%8;
                        let _ = my_byte.set_bits(from_bit, to_bit, value);
                    }
                }
            }
        }
        println!("DEBUG: get_bit elapsed time: {:?}", Instant::now().duration_since(start));
    }
}
