export const getUsers = async (_, res) => res.json(await User.find().select("-password"));
export const toggleBlockUser = async (req, res) => {
  const u = await User.findByIdAndUpdate(req.params.id, { $set: { blocked: !req.user.blocked } }, { new: true });
  res.json(u);
};

export const getUserLists = async (req, res) => {
  const u = await User.findById(req.params.id).populate("wishlist basket");
  res.json({ wishlist: u.wishlist, basket: u.basket });
};
