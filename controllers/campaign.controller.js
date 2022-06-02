const Campaign = require('../models/campaign.model')
const errorHandler = require('../helpers/dbErrorHandler')

const create = async (req, res) => {
    const { merkle_root, tokenAddress, leave, owner, ft_name, ft_symbol, ft_icon } = req.body
    const campaign = new Campaign(
        {
            tokenAddress: tokenAddress,
            ft_name: ft_name,
            ft_symbol: ft_symbol,
            ft_icon: ft_icon,
            merkle_root: merkle_root,
            leave: leave,
            owner: owner
        }
    )
    try {
        await campaign.save()
        return res.status(200).json({
            message: "Save new campaign successfully!"
        })
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const getCampaigns = async (req, res) => {
    try {
        const { account } = req.body
        let campaigns = await Campaign.find({})
        campaigns = [...campaigns]
        let result = []
        for (let val of campaigns) {
            result.push({ "merkle_root": val["merkle_root"], "leave": val["leave"], "tokenAddress": val["tokenAddress"], 
                "owner": val["owner"], "ft_name": val["ft_name"], "ft_symbol": val["ft_symbol"], "ft_icon": val["ft_icon"] })
        }
        let obj = {
            "appStatus": 0,
            "data": {
                "result": result
            }
        }
        res.json(obj)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

module.exports = {
    create,
    getCampaigns
}