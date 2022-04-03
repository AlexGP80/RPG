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
}

const B0: Bit = Bit::Zero;
const B1: Bit = Bit::One;

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
    pub fn pos(&self) -> i32 {
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
}

#[derive(Debug, PartialEq)]
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
        (self.bits & (1 << bit_number.pos())) >> bit_number.pos()
    }

    pub fn set_bit(&mut self, bit_number: NumBit, value: Bit) {
        self.bits = match value {
            Bit::Zero => {
                self.bits & !(1 << bit_number.pos())
            },
            Bit::One => {
                self.bits | (1 << bit_number.pos())
            }
        }
    }
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
}
