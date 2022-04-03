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
    pub fn num_bit(&self) -> i32 {
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

    pub fn get_bit(&self, num_bit: NumBit) -> u8 {
        0
    }
}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn test_num_bits() {
        assert_eq!(NumBit::B0.num_bit(), 0);
        assert_eq!(NumBit::B1.num_bit(), 1);
        assert_eq!(NumBit::B2.num_bit(), 2);
        assert_eq!(NumBit::B3.num_bit(), 3);
        assert_eq!(NumBit::B4.num_bit(), 4);
        assert_eq!(NumBit::B5.num_bit(), 5);
        assert_eq!(NumBit::B6.num_bit(), 6);
        assert_eq!(NumBit::B7.num_bit(), 7);
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
    }
}
