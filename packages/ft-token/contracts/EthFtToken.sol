//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EthFtToken is ERC20, Ownable {
    constructor() ERC20("EthFtToken", "haixuxu create") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}