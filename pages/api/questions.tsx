// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import Card from "../../components/common/Card";

export default (_: NextApiRequest, res: NextApiResponse<Card[]>) => {
  res.status(200).json([
    {
      id: 1,
      question: "Should there be more restrictions on the current process of purchasing a gun?",
      stance: "Not sure",
    },
    {
      id: 2,
      question: "Should teachers be allowed to carry guns at school?",
      stance: "Not sure",
    },
    {
      id: 3,
      question: "Should the government increase environmental regulations to prevent climate change?",
      stance: "Not sure",
    },
    {
      id: 4,
      question: "Should the U.S. withdraw from the Paris Climate Agreement?",
      stance: "Not sure",
    },
    {
      id: 5,
      question: "Do you support the use of hydraulic fracking to extract oil and natural gas resources?",
      stance: "Not sure",
    },
    {
      id: 6,
      question: "Should the government increase or decrease military spending?",
      stance: "Not sure",
    },
    {
      id: 7,
      question: "Should foreign terrorism suspects be given constitutional rights?",
      stance: "Not sure",
    },
    {
      id: 8,
      question: "Should funding for local police departments be redirected to social and community based programs?",
      stance: "Not sure",
    },
    {
      id: 9,
      question: "Should police departments be allowed to use military grade equipment?",
      stance: "Not sure",
    },
    {
      id: 10,
      question: "Should convicted criminals have the right to vote?",
      stance: "Not sure",
    },
    {
      id: 11,
      question: "Should the government require children to be vaccinated for preventable diseases?",
      stance: "Not sure",
    },
    {
      id: 12,
      question: "Do you support the use of nuclear energy?",
      stance: "Not sure",
    },
    {
      id: 13,
      question: "Should producers be required to label genetically engineered foods (GMOs)?",
      stance: "Not sure",
    },
    {
      id: 14,
      question: "Should the U.S. raise taxes on the rich?",
      stance: "Not sure",
    },
    {
      id: 15,
      question: "Should the government raise the federal minimum wage?",
      stance: "Not sure",
    },
    {
      id: 16,
      question: "Do you support a universal basic income program?",
      stance: "Not sure",
    },
    {
      id: 17,
      question: "Should the U.S. build a wall along the southern border?",
      stance: "Not sure",
    },
    {
      id: 18,
      question: "Should illegal immigrants have access to government-subsidized healthcare?",
      stance: "Not sure",
    },
    {
      id: 19,
      question: "Should undocumented immigrants be offered in-state tuition rates at public colleges within their residing state?",
      stance: "Not sure",
    },
    {
      id: 20,
      question: "Should the electoral college be abolished?",
      stance: "Not sure",
    },
    {
      id: 21,
      question: "Should foreigners, currently residing in the United States, have the right to vote?",
      stance: "Not sure",
    },
    {
      id: 22,
      question: "Should a photo ID be required to vote?",
      stance: "Not sure",
    },
    {
      id: 23,
      question: "Should the government increase spending on public transportation?",
      stance: "Not sure",
    },
    {
      id: 24,
      question: "Do you support the Patient Protection and Affordable Care Act (Obamacare)?",
      stance: "Not sure",
    },
    {
      id: 25,
      question: "Should the federal government increase funding of health care for low income individuals (Medicaid)?",
      stance: "Not sure",
    },
    {
      id: 26,
      question: "Do you support a single-payer healthcare system?",
      stance: "Not sure",
    },
    {
      id: 27,
      question: "Should the government continue to fund Planned Parenthood?",
      stance: "Not sure",
    },
    {
      id: 28,
      question: "Are you pro-choice on abortion?",
      stance: "Not sure",
    },
    {
      id: 29,
      question: "Should health insurance providers be required to offer free birth control?",
      stance: "Not sure",
    },
    {
      id: 30,
      question: "Do you support increasing taxes for the rich in order to reduce interest rates for student loans?",
      stance: "Not sure",
    },
    {
      id: 31,
      question: "Should the federal government pay for tuition at four-year colleges and universities?",
      stance: "Not sure",
    },
    {
      id: 32,
      question: "Should critical race theory be taught in K-12 education?",
      stance: "Not sure",
    },
    {
      id: 33,
      question: "Should the President be able to authorize military force against Al-Qaeda without Congressional approval?",
      stance: "Not sure",
    },
    {
      id: 34,
      question: "Should the US assassinate suspected terrorists in foreign countries?",
      stance: "Not sure",
    },
    {
      id: 35,
      question: "Should the U.S. Capitol in Washington D.C. be protected by a security fence?",
      stance: "Not sure",
    },
  ]);
};
