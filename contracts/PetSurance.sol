pragma solidity ^0.6.12;

import "./Token.sol";

contract PetSurance {
    Token private token;
    string public name = "PetSurance";
    mapping(address => uint) public points;
    mapping(address => Referer) public referers;

    struct Referer {
        address refererAddress;
        address[] users;
    }

    event TicketRefLog(
        address[] users
    );

    constructor(Token _token) public {
        token = _token;
    }

    // user sign up for refer
    function createReferer() external {
        referers[msg.sender] = Referer(msg.sender, new address[](0));
        emit TicketRefLog(referers[msg.sender].users);
    }
    
    // friend of friend sign up for refer
    function addReferer(address referLink) external {
        Referer storage _referer = referers[referLink];
        _referer.users.push(msg.sender);
        referers[referLink] = _referer;
        
        referers[msg.sender] = Referer(msg.sender, new address[](0));
        referers[msg.sender].users.push(referLink);
        emit TicketRefLog(referers[msg.sender].users);
    }
    
    function sendPoints(address _referLink, address _refererAddress) public {
        Referer storage _referer = referers[_referLink];
        uint len = _referer.users.length;
        for(uint i = 0; i < len; i++){
            points[_referer.users[i]] += 500000000000000000;
        }
        points[_referLink] += 500000000000000000;
        points[_refererAddress] += 500000000000000000;
    }

    function withdrawTokens() external {
        token.mint(msg.sender, points[msg.sender]);
        points[msg.sender] = 0;
    } 
}