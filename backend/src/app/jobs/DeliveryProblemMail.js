import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class DeliveryProblemMail {
  get key() {
    return 'DeliveryProblemMail';
  }

  async handle({ data }) {
    const { registrationMail, description } = data;

    await Mail.sendMail({
      to: `${registrationMail.deliveryman.name} <${registrationMail.deliveryman.email}>`,
      subject: 'Uma das entregas foi cancelada!',
      template: 'deliveryproblemmail',
      context: {
        name: registrationMail.deliveryman.name,
        code: registrationMail.id,
        problem: description,
        canceleddate: format(
          parseISO(registrationMail.canceled_at),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new DeliveryProblemMail();
