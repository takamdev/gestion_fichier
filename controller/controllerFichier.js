const fileModel = require("../models/file.js")

const home = async (req,res)=>{
    await fileModel.find({}).sort({_id:-1}).then((image =>{
        res.render('pages/home',{image:image})
    })).catch(error=>console.log(error))
   
}

const upload = (req,res)=>{
   if(!req.body.nom) {
    req.flash('nom',true)
    res.redirect('/')
   }else{
    if (!req.files || Object.keys(req.files).length === 0) { //verifie si l'image existe
        req.flash('file',"veuillez choisir un fichier")
       return res.redirect('/')
      }
      if(!req.files.image.mimetype.startsWith("image/")){ // tout les images commence par image/
        req.flash('file','veuiller choisir un fichier image')
        res.redirect('/')
      }
      if(req.files.image.size>2*1024*1024){ // verifie la taille de l'image
        req.flash('file','veuiller choisir un fichier image de maximun 5MB')
        res.redirect('/')
      }
      const file = req.files.image
      const fileName = Date.now() + req.files.image.name;
      const filePath = './public/imageWeb/'+fileName 

   
      file.mv(filePath, async function(err) {
        if (err)return res.status(500).send(err);
          else{
               let newimage = new fileModel({
                name:req.body.nom,
                image:fileName
               });


               try {
                await newimage.save()
                req.flash("succes",true)
                return res.redirect('/')
               } catch (error) {
                console.log(error);
               }
            
           
          }
    
        
      });
   }
}
module.exports ={home,upload}