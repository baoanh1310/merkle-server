const mongoose = require('mongoose')

const CampaignSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: 'Campaign owner address is required'
    },
    merkle_root: {
        type: String,
        required: 'Merkle root is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    tokenAddress: {
        type: String,
        required: 'Fugible token contract is required'
    },
    ft_name: {
        type: String,
        required: 'Fugible token name is required'
    },
    ft_symbol: {
        type: String,
        required: 'Fugible token symbol is required'
    },
    ft_icon: {
        type: String,
        required: 'Fugible token icon is required'
    },
    leave: {
        type: [String]
    }
})

module.exports = mongoose.model('Campaign', CampaignSchema)