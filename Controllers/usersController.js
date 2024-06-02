import userModel from "../Models/userModel.js";
import linkModel from "../Models/linkModel.js";

  const UsersController = {
  
  getList: async (req,res)=>{
    try {
    const users =  await userModel.find().select("name email links");
    res.json(users);}
    catch(e){
        res.status(400).json({ message: e.message }); 
    }
  },

  getById: async(req,res)=>{
   try{
       const user =await userModel.findById(req.params.id);
      res.json(user);}
      catch(e){
      res.status(400).json({ message: e.message });
      }
  },
  add:async(req,res)=>{   
      const {name,email,password}=req.body;      
      try {
        const newUser = await userModel.create({name,email,password})
        res.json(newUser);
      }catch(e){
        res.status(400).json({ message: e.message });
      }
  },

  update: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },


  delete:async (req,res)=>{
      const {id}=req.params;
      try {
        const deleted = await userModel.findByIdAndDelete(id);
        res.json(deleted);}
        catch(e){
            res.status(400).json({message: e.message});
        }
  },

  addLink: async (req, res) => {
    const { id } = req.params;
    const { originalUrl } = req.body;

    try {
      const user = await userModel.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const newLink = await linkModel.create({originalUrl})
      user.links.push(newLink.id);
      await user.save();
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
  getLinks: async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await userModel.findById(id).populate('links');
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(user.links);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
  deleteLink: async (req, res) => {
    const { id, linkId } = req.params;
  
    try {
      const user = await userModel.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const linkIndex = user.links.indexOf(linkId);
      if (linkIndex === -1) {
        return res.status(404).json({ message: "Link not found in user" });
      }
  
      user.links.splice(linkIndex, 1);
      await user.save();
  
      await linkModel.findByIdAndDelete(linkId);
  
      res.json({ message: "Link deleted" });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
  
  updateLink: async (req, res) => {
    const { id, linkId } = req.params;
    const { originalUrl } = req.body;
  
    try {
      const user = await userModel.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const link = await linkModel.findById(linkId);
      if (!link) {
        return res.status(404).json({ message: "Link not found" });
      }
  
      link.originalUrl = originalUrl;
      await link.save();
  
      res.json(link);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
  

  };
  export default UsersController;