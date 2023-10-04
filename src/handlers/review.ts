import prisma  from "../db"

    export const getOneReview= async (req, res) => {
    const review = await prisma.review.findUnique({
        where: {
        id: req.params.id
        }
    })

    res.json({data: review})
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
            rating: rating,
            text: text,
            user: { connect: { id: userId } },
            product: { connect: { id: productId } }
            }
        });
    
        res.json({ data: newreview });
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        }
    };

    export const updateReview = async (req, res) => {
    
    const updatedUpdate = await prisma.review.update({
        where: {
        id: req.params.id
        },
        data: req.body
    })

    res.json({data: updatedUpdate})
    }

    export const deleteReview = async (req, res) => {

    const deleted = await prisma.review.delete({
        where: {
        id: req.params.id
        }
    })

    res.json({data: deleted})
    }