
exports.authenticate = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if (!auth){
            return res.status(400).json({
                message: 'Authorization failed: No token passed'
            })
        }
        const token = auth.split(' ')[1];
        if (!token){
            return res.status(403).json({
                message: 'Token not found'
            })
        }

        

    } catch (error) {
        console.log(error.message)
      res.status(500).json({
        message: 'Internal Server Error'
      })  
    }
}
