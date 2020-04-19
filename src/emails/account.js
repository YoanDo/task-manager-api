const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//   to: 'y.n.dorny@gmail.com',
//   from: 'y.n.dorny@gmail.com',
//   subject: 'this is my first email test',
//   text: "let's hope it works 🤞"
// }).then(() => {
//   console.log('Message sent')
// }).catch((error) => {
//   console.log(error.response.body)
//   // console.log(error.response.body.errors[0].message)
// })

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to:email,
    from: 'y.n.dorny@gmail.com',
    subject: `Welcome to the app ${name}`,
    text: 'Thanks for joining us 😘'
  }).then(() => {
  console.log(`✉️ Welcome message sent to ${name}`)
}).catch((error) => {
  console.log(error.response.body)
  // console.log(error.response.body.errors[0].message)
})
}

const goodByeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'y.n.dorny@gmail.com',
    subject: `Goodbye ${name} 👋`,
    text: `Let us know what went wrong 😢`
  }).then(() => {
    console.log(`✉️ Goodbye message sent to ${name}`)
  }).catch((error) => {
    console.log(error.response.body)
    // console.log(error.response.body.errors[0].message)
  })
}

module.exports = {
  sendWelcomeEmail,
  goodByeEmail
}
