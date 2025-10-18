export const mockMedicalAnalysis = {
  reportType: "Complete Blood Count (CBC)",
  date: "2024-10-15",
  summary: "Blood test showing some elevated values that require attention. Most results are within normal range.",
  testResults: [
    {
      name: "White Blood Cell Count",
      value: 7.5,
      unit: "K/uL",
      normalRange: "4.5-11.0",
      status: "normal" as const,
    },
    {
      name: "Red Blood Cell Count",
      value: 5.2,
      unit: "M/uL",
      normalRange: "4.5-5.9",
      status: "normal" as const,
    },
    {
      name: "Hemoglobin",
      value: 13.5,
      unit: "g/dL",
      normalRange: "13.5-17.5",
      status: "normal" as const,
    },
    {
      name: "Hematocrit",
      value: 40.2,
      unit: "%",
      normalRange: "38.8-50.0",
      status: "normal" as const,
    },
    {
      name: "Platelet Count",
      value: 285,
      unit: "K/uL",
      normalRange: "150-400",
      status: "borderline" as const,
    },
    {
      name: "Glucose",
      value: 145,
      unit: "mg/dL",
      normalRange: "70-100",
      status: "abnormal" as const,
    },
    {
      name: "Cholesterol",
      value: 220,
      unit: "mg/dL",
      normalRange: "<200",
      status: "abnormal" as const,
    },
  ],
  abnormalValues: [
    {
      name: "Glucose",
      value: 145,
      normalRange: "70-100 mg/dL",
      severity: "medium" as const,
      explanation:
        "Elevated glucose levels may indicate prediabetes or metabolic issues. Recommend dietary changes and exercise.",
    },
    {
      name: "Cholesterol",
      value: 220,
      normalRange: "<200 mg/dL",
      severity: "medium" as const,
      explanation:
        "High cholesterol increases cardiovascular risk. Consider lifestyle modifications and consult a cardiologist.",
    },
  ],
  recommendations: [
    "Reduce sugar and refined carbohydrate intake",
    "Increase physical activity to at least 150 minutes per week",
    "Maintain a heart-healthy diet rich in vegetables and lean proteins",
    "Monitor blood glucose levels regularly",
    "Schedule follow-up blood work in 3 months",
    "Reduce sodium intake to help manage cholesterol",
  ],
  specialists: [
    {
      type: "Endocrinologist",
      reason: "To evaluate elevated glucose levels and assess diabetes risk",
    },
    {
      type: "Cardiologist",
      reason: "To assess cardiovascular health given elevated cholesterol",
    },
  ],
  healthStatus: {
    normalCount: 4,
    borderlineCount: 1,
    abnormalCount: 2,
    overallStatus: "caution" as const,
  },
}

export const mockChatResponses: Record<string, string> = {
  abnormal:
    "Based on your report, the elevated glucose level of 145 mg/dL is concerning. This is above the normal fasting range of 70-100 mg/dL. This could indicate prediabetes or metabolic syndrome. I recommend:\n\n1. Consult an endocrinologist for proper evaluation\n2. Reduce refined carbohydrates and sugar intake\n3. Increase physical activity\n4. Monitor your glucose levels regularly\n\nThese lifestyle changes can significantly improve your glucose levels.",
  remedies:
    "Here are some natural approaches to help manage your health based on your results:\n\n1. **Diet**: Focus on whole grains, lean proteins, and plenty of vegetables. Avoid sugary drinks and processed foods.\n2. **Exercise**: Aim for 150 minutes of moderate activity weekly - walking, swimming, or cycling.\n3. **Sleep**: Get 7-9 hours of quality sleep to help regulate metabolism.\n4. **Stress**: Practice meditation or yoga to reduce stress, which affects glucose levels.\n5. **Hydration**: Drink plenty of water throughout the day.\n\nThese changes work best alongside medical treatment. Always consult your doctor before making major changes.",
  doctor:
    "Based on your test results, I recommend seeing:\n\n1. **Endocrinologist** - Primary specialist for your elevated glucose levels. They can assess diabetes risk and create a treatment plan.\n2. **Cardiologist** - Important given your elevated cholesterol. They'll evaluate your cardiovascular health and recommend preventive measures.\n3. **Primary Care Physician** - For overall coordination of your care and follow-up monitoring.\n\nSchedule appointments within the next 2-4 weeks for proper evaluation.",
  urgent:
    "Your results show some concerning values that need attention, but they are not immediately life-threatening. However, I recommend:\n\n1. Schedule doctor appointments within 1-2 weeks\n2. Monitor for symptoms like excessive thirst, fatigue, or chest discomfort\n3. Start making dietary and lifestyle changes immediately\n4. Avoid strenuous activity until cleared by your doctor\n\nIf you experience severe symptoms, seek immediate medical attention.",
  default:
    "I'm here to help you understand your medical report. Based on your analysis, you have some values that need attention. The most important steps are to consult with the recommended specialists and make the lifestyle changes suggested in your report. Feel free to ask me specific questions about your results!",
}
