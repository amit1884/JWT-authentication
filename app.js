const express=require('express');
const jwt=require('jsonwebtoken');

const app=express();

const secretKey='Rasen Shariken'
app.get('/api',(req,res)=>{

    res.json({
        message:'Welcome to the API'
    });
});

app.post('/api/posts',verifytoken,(req,res)=>{

    jwt.verify(req.token,secretKey,(err,authData)=>{

        if(err)
        {
            res.send({
                message:'some error occurred'
            })
        }
        else{

            res.json({
                message:"Post created....",
                authData
            })
        }
    })
})

app.post('/api/login',(req,res)=>{

    //Mock user
    const user={
        id:1,
        username:'amit',
        email:'amit123@gmail.com'
    }
    jwt.sign({user},secretKey,{expiresIn:'30s'},(err,token)=>{

        res.json({
            token
        })
    });
})

//Format a token

//Authorization:Bearer <access_token>

function verifytoken(req,res,next){

    //Get the auth header value

    const bearerHeader=req.headers['authorization'];

    //check if bearer is undefined

    if(typeof bearerHeader!=='undefined'){

        //Split at the space

        const bearer=bearerHeader.split(' ');
        //Get token from array

        const bearerToken=bearer[1];
        //set the token

        req.token=bearerToken;
        //Next middleware
        next();
    }
    else{

        //Forbidden
        res.send({
            message:"Token Expired ! Relogin to continue"
        });
    }
}

app.listen(5000,()=>{
    console.log('Server Started on Port 5000............')
})