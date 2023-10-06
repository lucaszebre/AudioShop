import prisma  from "../db"

    export const getOneReview= async (req, res) => {
        try {

            if(req.params.id){
                console.log(req.params.id)
                const review = await prisma.review.findUnique({
                    where: {
                    id: req.params.id
                    }
                })
                if (!review) {
                  return res.status(404).json({ error: 'Order not found' });
                }else{
                  res.json({data: review})
          
                }
              }else{
                return res.status(404).json({ error: 'Need an id' });
              }

        } catch (error) {
        res.status(500).json({ error: 'Server error' });
        }
   
    }

    export const getReviews = async (req, res) => {
    const reviews = await prisma.review.findMany({
        where: {
        userId: req.user.id
        }
    })


    res.json({data: reviews})
    }
export const createReview = async (req, res) => {
try {
      // Assuming user and product IDs are provided in the request body
    const {  productId, rating, text } = req.body;
    const {userId} = req.user.id
      // Validate the provided data as necessary
       // ...
    
    const newreview = await prisma.review.create({
            data: {
            rating,
            text,
            userId ,
            productId } }
            
        );
    
        res.json({  newreview });
        }
        catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        }
    };

    export const updateReview = async (req, res) => {
        try {
            if(req.params.id){
                console.log(req.params.id)
                const review = await prisma.review.findUnique({
                    where: {
                    id: req.params.id
                    }
                })
                if (!review) {
                  return res.status(404).json({ error: 'Order not found' });
                }else{
                    const updatedUpdate = await prisma.review.update({
                        where: {
                        id: req.params.id
                        },
                        data: req.body
                    })
                
                    res.json({data: updatedUpdate})
          
                }
              }else{
                return res.status(404).json({ error: 'Need an id' });
              }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    
    
    }

    export const deleteReview = async (req, res) => {

    const deleted = await prisma.review.delete({
        where: {
        id: req.params.id
        }
    })

    res.json({data: deleted})
    }