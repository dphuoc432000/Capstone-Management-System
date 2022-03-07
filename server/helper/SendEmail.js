const mailer_config = require('../config/mailer.config');
const nodemailer = require('nodemailer');


const LectureMail = (email, password) => {
    return {
        from: mailer_config.CMS_USERNAME, // sender address
        to: email, // list of receivers
        subject: `SEDCO - Khôi phục mật khẩu`, // Subject line
        html: `
            Chào bạn,
            <p>Chúng tôi là hệ thống CMS từ Trường Đại học Duy Tân. Cung cấp tài khoản đăng nhập đến bạn: </p>
            <span><nobr>+ Email: <h4>${email}</h4></nobr></span>
            <span><nobr>+ Password: <h4>${password}</h4></nobr><span>
            <br>
            <strong>Yêu cầu bắt buộc sau khi đăng nhập lần đầu tiên vào hệ thống</strong>
            <ul>
                <li>Cập nhật đầy đủ thông tin</li>
                <li>Thay đổi mật khẩu</li>
            </ul>
            <p><strong>Truy cập hệ thông: </strong> <a href="http://localhost:5000"/> .</p>
            <br />
            <p>Cảm ơn bạn vì đã sử dụng hệ thống. Chúc bạn sức khỏe!</p>
            `, // html body
    }
}

const sendEmailUser = async (email, password, objectNeedSend) => {
    let transporter = nodemailer.createTransport({
        host: mailer_config.MAILER_HOST,
        port: mailer_config.MAILER_PORT,
        secure: mailer_config.MAILER_SECURE, // true for 465, false for other ports
        auth: {
            user: mailer_config.CMS_USERNAME, // generated ethereal user
            pass: mailer_config.CMS_PASSWORD, // generated ethereal password
        },
    });

    let info = await transporter.sendMail(
        objectNeedSend(email, password)
    )
        .then(data => data)
        .catch(err => err);
    return info.messageId;
}

module.exports = {sendEmailUser, LectureMail};