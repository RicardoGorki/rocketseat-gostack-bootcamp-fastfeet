import Mail from '../../lib/Mail';

class DeliveryDeletedMail {
  get key() {
    return 'DeliveryDeletedMail';
  }

  async handle({ data }) {
    const { registrationMail } = data;

    await Mail.sendMail({
      to: `${registrationMail.deliveryman.name} <${registrationMail.deliveryman.email}>`,
      subject: 'Uma de suas entregas foi removida',
      template: 'deliverydeletedmail',
      context: {
        name: registrationMail.deliveryman.name,
        code: registrationMail.id,
      },
    });
  }
}

export default new DeliveryDeletedMail();
