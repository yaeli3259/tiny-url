import linkModel from "../Models/linkModel.js";
import clickModel from "../Models/clickModel.js";
import targetModel from '../Models/targetModel.js'
const LinksController = {
  getList: async (req,res)=>{
    try {
    const links =  await linkModel.find();
    res.json(links);}
    catch(e){
        res.status(400).json({ message: e.message }); 
    }
  },

  getById: async(req,res)=>{
   try{
       const links =await linkModel.findById(req.params.id);
      res.json(links);}
      catch(e){
      res.status(400).json({ message: e.message });
      }
  },
add :async (req, res) => {
    const { originalUrl, targets } = req.body;
  
    try {
      const newLink = await linkModel.create({ originalUrl });
  
      if (targets && targets.length > 0) {
        const newTargets = [];
        for (const target of targets) {
          const newTarget = new targetModel(target);
          newTargets.push(newTarget);
        }
        newLink.targetValues.push(...newTargets);
      }
  
      await newLink.save();
  
      const shortUrl = `https://tinyurl.co.il/${newLink._id}`;
      res.status(201).json({ originalUrl: newLink.originalUrl, shortUrl });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Failed to create short URL', error: error.message });
    }
  },

update: async (req, res) => {
  const { id } = req.params;
  try {
    const updatedLink= await linkModel.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.json(updatedLink);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
},
delete:async (req,res)=>{
  const {id}=req.params;
  try {
    const deleted = await linkModel.findByIdAndDelete(id);
    res.json(deleted);}
    catch(e){
        res.status(400).json({message: e.message});
    }
},

redirectAndUpdate: async (req, res) => {
  const { linkId } = req.params;

  try {
    const link = await linkModel.findById(linkId);
    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    const targetParamValue = req.query[link.targetParamName];
    
    link.clicks.push(new clickModel({
      insertedAt: new Date(),
      ipAddress: req.ip,
      targetParamValue 
    }));

    await link.save();

    res.redirect(link.originalUrl);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
},

getClicksBySource: async (req, res) => {
  const { linkId } = req.params;

  try {
    const link = await linkModel.findById(linkId);
    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    const clicksBySource = link.clicks.reduce((acc, click) => {
      const source = click.targetParamValue || 'unknown';
      if (!acc[source]) {
        acc[source] = 0;
      }
      acc[source]++;
      return acc;
    }, {});
    // res.json(link.clicks);
    res.json(clicksBySource);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

};
export default LinksController;