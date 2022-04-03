pub enum NumBit {
    B7,
    B6,
    B5,
    B4,
    B3,
    B2,
    B1,
    B0,
}

impl NumBit {
    pub fn pos(&self) -> i32 {
        match self {
            NumBit::B0 => 0,
            NumBit::B1 => 1,
            NumBit::B2 => 2,
            NumBit::B3 => 3,
            NumBit::B4 => 4,
            NumBit::B5 => 5,
            NumBit::B6 => 6,
            NumBit::B7 => 7,
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
}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn test_num_bits() {
        assert_eq!(NumBit::B0.pos(), 0);
        assert_eq!(NumBit::B1.pos(), 1);
        assert_eq!(NumBit::B2.pos(), 2);
        assert_eq!(NumBit::B3.pos(), 3);
        assert_eq!(NumBit::B4.pos(), 4);
        assert_eq!(NumBit::B5.pos(), 5);
        assert_eq!(NumBit::B6.pos(), 6);
        assert_eq!(NumBit::B7.pos(), 7);
    }

    #[test]
    fn test_new_rusty_byte() {
        let my_byte = RustyByte::new(0);
        assert_eq!(my_byte.value(), 0);
    }

    #[test]
    fn test_get_bit() {
        let my_byte = RustyByte::new(1);
        assert_eq!(my_byte.get_bit(NumBit::B0), 1);
        assert_eq!(my_byte.get_bit(NumBit::B1), 0);
        assert_eq!(my_byte.get_bit(NumBit::B2), 0);
        assert_eq!(my_byte.get_bit(NumBit::B3), 0);
        assert_eq!(my_byte.get_bit(NumBit::B4), 0);
        assert_eq!(my_byte.get_bit(NumBit::B5), 0);
        assert_eq!(my_byte.get_bit(NumBit::B6), 0);
        assert_eq!(my_byte.get_bit(NumBit::B7), 0);
        let my_byte = RustyByte::new(10);
        assert_eq!(my_byte.get_bit(NumBit::B0), 0);
        assert_eq!(my_byte.get_bit(NumBit::B1), 1);
        assert_eq!(my_byte.get_bit(NumBit::B2), 0);
        assert_eq!(my_byte.get_bit(NumBit::B3), 1);
        assert_eq!(my_byte.get_bit(NumBit::B4), 0);
        assert_eq!(my_byte.get_bit(NumBit::B5), 0);
        assert_eq!(my_byte.get_bit(NumBit::B6), 0);
        assert_eq!(my_byte.get_bit(NumBit::B7), 0);
        let my_byte = RustyByte::new(63);
        assert_eq!(my_byte.get_bit(NumBit::B0), 1);
        assert_eq!(my_byte.get_bit(NumBit::B1), 1);
        assert_eq!(my_byte.get_bit(NumBit::B2), 1);
        assert_eq!(my_byte.get_bit(NumBit::B3), 1);
        assert_eq!(my_byte.get_bit(NumBit::B4), 1);
        assert_eq!(my_byte.get_bit(NumBit::B5), 1);
        assert_eq!(my_byte.get_bit(NumBit::B6), 0);
        assert_eq!(my_byte.get_bit(NumBit::B7), 0);
        let my_byte = RustyByte::new(128);
        assert_eq!(my_byte.get_bit(NumBit::B0), 0);
        assert_eq!(my_byte.get_bit(NumBit::B1), 0);
        assert_eq!(my_byte.get_bit(NumBit::B2), 0);
        assert_eq!(my_byte.get_bit(NumBit::B3), 0);
        assert_eq!(my_byte.get_bit(NumBit::B4), 0);
        assert_eq!(my_byte.get_bit(NumBit::B5), 0);
        assert_eq!(my_byte.get_bit(NumBit::B6), 0);
        assert_eq!(my_byte.get_bit(NumBit::B7), 1);
    }
}
