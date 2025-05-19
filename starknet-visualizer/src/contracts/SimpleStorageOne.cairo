#[starknet::interface]
trait HelloContractInterface<TContractState> {

    fn add_two_numbers(ref self: TContractState, a:felt252, b:felt252);
    fn get_sum_of_two_numbers(self: @TContractState) -> felt252;

}



#[starknet::contract]
mod HelloContract {
    
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
    use super::HelloContractInterface;

    #[storage]
    pub struct Storage {
        pub sum: felt252
    }

    #[abi(embed_v0)]
    pub impl HelloImpl of HelloContractInterface<ContractState> {
        fn add_two_numbers(ref self: ContractState, a:felt252, b:felt252) {
            let sum_a_b = a + b;

            self.sum.write(sum_a_b);
        }

        fn get_sum_of_two_numbers(self: @ContractState) -> felt252 {
            self.sum.read()
        }
    }
}