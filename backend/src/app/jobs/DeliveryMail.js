import Mail from '../../lib/Mail';

class DeliveryMail {
  get key() {
    return 'DeliveryMail';
  }

  async handle({ data }) {
    const { registrationMail } = data;

    await Mail.sendMail({
      to: `${registrationMail.deliveryman.name} <${registrationMail.deliveryman.email}>`,
      subject: 'Você possui uma nova entrega',
      template: 'deliverymail',
      context: {
        code: registrationMail.id,
        name: registrationMail.deliveryman.name,
        product: registrationMail.product,
        recipient: registrationMail.recipient.name,
        street: registrationMail.recipient.street,
        number: registrationMail.recipient.number,
        complement: registrationMail.recipient.complement,
        state: registrationMail.recipient.state,
        city: registrationMail.recipient.city,
        postcode: registrationMail.recipient.postcode,
      },
    });
  }
}

export default new DeliveryMail();
