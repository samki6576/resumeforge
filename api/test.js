module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ 
        message: 'Test endpoint is working!',
        method: req.method,
        path: req.url,
        headers: req.headers
    });
};
