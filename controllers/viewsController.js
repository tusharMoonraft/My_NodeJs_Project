const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const catchAsync=require('../utils/catchAsync');
const AppError=require('../utils/appError');


exports.getOverview= catchAsync(async (req,res,next)=>{
    
    const tours=await Tour.find();

   
    res.status(200).render('overview',{
      title:'All Tour',
      tours
    })
});

exports.getTour=catchAsync(async (req,res,next)=>{
    //1) Get Tour data from collection
    const tour=await Tour.findOne({slug:req.params.slug}).populate({
        path:'reviews',
        fields:'review rating user'
    })

    if(!tour){
      return next(new AppError('There is no tour with that name.',404))
    }

     //2) Build Template
    //3) Render that template using tour data from 1)
    
    res.status(200).render('tour',{
      title:`${tour.name} tour`,
      tour
    })
  });

exports.getLoginForm=(req,res,next)=>{
  res.status(200).render('login',{
    title:'Log into your account'
  })
};
exports.getTourCreateForm=(req,res,next)=>{
  res.status(200).render('tourCreate',{
    title:'Create new tour'
  })
};
exports.getAccount=(req,res)=>{
  res.status(200).render('account',{
    title:'Your account'
  });
};

exports.updateUserData=catchAsync(async (req,res,next)=>{
  const updatedUser=await User.findByIdAndUpdate(req.user.id,{
    name:req.body.name,
    email:req.body.email,
    photo:req.body.photo
  },
  {
    new:true,
    runValidators:true
  }
  );
  res.status(200).render('account',{
    title:'Your account',
    user:updatedUser

  });
  
});
