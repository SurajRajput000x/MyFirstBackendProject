import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



const uploadOnCloudinary = async(localFileName) => {
    try {
        if(!localFileName) return null

      // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFileName, {
            resource_type: 'auto'
        })

       // file uploaded successfully
       console.log("File uploaded successfully")
        fs.unlinkSync(localFileName)
        return response

    } catch (error) {
        fs.unlinkSync(localFileName)    // remove thelocally saved temporary file as the upload operation got failed
        return null
    }
}



export {uploadOnCloudinary}
