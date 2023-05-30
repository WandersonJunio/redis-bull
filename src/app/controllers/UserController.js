import generatePassword from "password-generator";
import GlobalDefs from "../lib/GlobalDefs";
import Queues from "../lib/Queue";

export default {
  store(req, res) {
    const { name, email } = req.body;

    const user = {
      name,
      email,
      password: generatePassword(15, false),
    };

    let emailData = {
      sender: "<wanderson.juniorjr@gmail.com>",
      subject: "Email de test",
      recipient_name: user.name,
      recipient_email: user.email,
      message:
        `Parabéns, ${user.name}, voce foi contratado. Bem vindo a Programming Lessons.<br>` +
        `Sua senha temporaria é: '${user.password}'.`,
    };

    Queues.addJob(GlobalDefs.JobType.MailJob, { emailData });

    emailData = {
      sender: "<wanderson.juniorjr@gmail.com>",
      subject: "Novo colaborador",
      recipient_name: "Developer",
      recipient_email: "wanderson.juniorjr@gmail.com",
      message: `Atenção, novo colaborador contratado para sua equipe.<br>Nome: ${user.name}.`,
    };

    Queues.addJob(GlobalDefs.JobType.MailJob, { emailData });
    Queues.addJob(GlobalDefs.JobType.PersistenceJob, { user });

    return res.json(user);
  },
};
