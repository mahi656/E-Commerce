import Address from "../models/Address.js";

// @desc    Get user addresses
// @route   GET /api/address
// @access  Private
export const getMyAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({ user: req.user._id });
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add new address
// @route   POST /api/address
// @access  Private
export const addAddress = async (req, res) => {
    try {
        const { name, street, city, state, zipCode, country, isDefault } = req.body;
        
        // Check for existing duplicate address
        const existingAddress = await Address.findOne({
            user: req.user._id,
            street,
            city,
            zipCode,
            country
        });

        if (existingAddress) {
            // Update default status if requested
            if (isDefault) {
                await Address.updateMany({ user: req.user._id }, { isDefault: false });
                existingAddress.isDefault = true;
                await existingAddress.save();
            }
            return res.status(200).json(existingAddress);
        }

        if (isDefault) {
            await Address.updateMany({ user: req.user._id }, { isDefault: false });
        }

        const address = new Address({
            user: req.user._id,
            name,
            street,
            city,
            state,
            zipCode,
            country,
            isDefault: isDefault || false
        });

        const createdAddress = await address.save();
        res.status(201).json(createdAddress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update address
// @route   PUT /api/address/:id
// @access  Private
export const updateAddress = async (req, res) => {
    try {
        const { name, street, city, state, zipCode, country, isDefault } = req.body;
        
        const address = await Address.findById(req.params.id);

        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        if (address.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to update this address" });
        }

        if (isDefault) {
             await Address.updateMany({ user: req.user._id }, { isDefault: false });
        }

        address.name = name || address.name;
        address.street = street || address.street;
        address.city = city || address.city;
        address.state = state || address.state;
        address.zipCode = zipCode || address.zipCode;
        address.country = country || address.country;
        address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;

        const updatedAddress = await address.save();
        res.json(updatedAddress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete Address
// @route   DELETE /api/address/:id
// @access  Private
export const deleteAddress = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);

        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        if (address.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await address.deleteOne();
        res.json({ message: "Address removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
