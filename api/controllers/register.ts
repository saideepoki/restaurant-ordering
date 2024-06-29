export default function register(req: any, res: any) {
    const{username, email, password} = req.body;
    res.json({username, email, password})
}