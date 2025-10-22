// index.js
// โค้ด Web API ด้วย Node.js และ Express.js
// พร้อมสำหรับการ Deploy บน Azure App Service

import express from 'express';

// กำหนดพอร์ตจาก Environment Variable (สำหรับ Azure App Service)
// ถ้าไม่มีการกำหนด ให้ใช้พอร์ต 3000 เป็นค่าเริ่มต้น (สำหรับ Local Development)
const PORT = process.env.PORT || 3000;

// สร้างแอปพลิเคชัน Express
const app = express();

// Middleware เพื่อให้สามารถอ่าน JSON ได้
app.use(express.json());

// ---------------------------------------------------------------------
// 1. Health Check / Root Endpoint
// ---------------------------------------------------------------------
app.get('/', (req, res) => {
    // Endpint พื้นฐานสำหรับการทดสอบว่าแอปทำงานอยู่หรือไม่
    const responseData = {
        message: 'สวัสดี! Node.js API กำลังทำงานอยู่บน Azure App Service (หรือ Local)',
        status: 'Online',
        environment: process.env.NODE_ENV || 'development',
    };
    console.log(`[GET /] ตอบกลับด้วยสถานะ: ${responseData.status}`);
    res.status(200).json(responseData);
});

// ---------------------------------------------------------------------
// 2. Sample API Endpoint (GET)
// ---------------------------------------------------------------------
app.get('/api/users', (req, res) => {
    try {
        // ข้อมูลจำลอง
        const users = [
            { id: 1, name: 'สมชาย รักดี', role: 'Developer' },
            { id: 2, name: 'สมหญิง ใจงาม', role: 'Designer' },
            { id: 3, name: 'ประยุทธ์ สุขสบาย', role: 'Manager' },
        ];
        
        console.log(`[GET /api/users] ส่งข้อมูลผู้ใช้จำนวน ${users.length} ราย`);
        res.status(200).json(users);
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', error);
        res.status(500).json({ 
            error: 'ข้อผิดพลาดภายในเซิร์ฟเวอร์',
            details: error.message 
        });
    }
});

// ---------------------------------------------------------------------
// 3. Sample API Endpoint (POST)
// ---------------------------------------------------------------------
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        console.warn('[POST /api/register] ข้อมูลไม่ครบถ้วน');
        return res.status(400).json({ message: 'กรุณาระบุชื่อผู้ใช้และรหัสผ่าน' });
    }

    // ในสถานการณ์จริง จะต้องบันทึกข้อมูลนี้ลงในฐานข้อมูล
    const newUserId = Math.floor(Math.random() * 1000) + 10;
    
    console.log(`[POST /api/register] ลงทะเบียนผู้ใช้ใหม่: ${username}`);
    res.status(201).json({ 
        message: `ลงทะเบียนสำเร็จแล้ว`, 
        userId: newUserId,
        username: username 
    });
});

// ---------------------------------------------------------------------
// เริ่มต้น Server
// ---------------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`\n==============================================`);
    console.log(`🚀 Server เปิดใช้งานแล้วบนพอร์ต: ${PORT}`);
    console.log(`🌐 เข้าถึงได้ที่: http://localhost:${PORT}`);
    console.log(`==============================================\n`);
});

// ใช้ 'export default app;' หากคุณต้องการใช้ไฟล์นี้ร่วมกับการทดสอบ
// export default app;
