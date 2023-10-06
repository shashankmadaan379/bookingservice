const { BookingService } = require("../services/index");
const { StatusCodes } = require("http-status-codes");
const bookingService = new BookingService();
const {createChannel,publishMessage}=require("../utils/messageQueue")
const {REMINDER_BINDING_KEY}=require("../config/serverConfig")
class BookingController{
  constructor(channel){
  }
  async sendMessageToQueue(req,res){
    const channel=await createChannel();
    const payload={
      data:{
        subject:"This is a notification from queue",
        content:"Some queue will subscribe this",
        recepientEmail:"skmadaan11@gmail.com",
        notificationTime:"2023-10-07T01:10:00"
      },
      service:"CREATE_TICKET"
    };
    publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(payload));
    return res.status(200).json({
      message: "Successfully publihed the event",
      success: true,
    })
  }
  async create(req, res){
    try {
      const response = await bookingService.createBooking(req.body);
      console.log("From Booking Controller", response);
      return res.status(StatusCodes.OK).json({
        message: "Successfully created booking",
        success: true,
        err: {},
        data: response,
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        message: error.message,
        success: false,
        err: error.explanation,
        data: {},
      });
    }
  }
}

module.exports=BookingController
