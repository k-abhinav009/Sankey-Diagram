import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // Use the React plugin
  .init({
    resources: {
      en: {
        translation: {
          title: "Hello",
          SalaryExpenditure: "Salary and Expenditure",
          UpdateInflowOutflow: "Update Inflow and Outflow",
          Add: "Add",
          edit: "Edit",
          delete: "Delete",
          AddOutflowkps: "Add Outflow Breakups",
          Outflows: "Outflows",
          Inflows: "Inflows",
          AddOutflow: "Add Outflow",
          AddInflow: "Add Inflow",
          Name: "Name",
          Value: "Value",
          Details: "Details",
          ChildName: "Child Name",
          ChildValue: "Child Value",
          Save: "Save",
          Cancel: "Cancel",
          deleteText: "are you sure you want to delete",
          "Add {{category}}": "Add {{category}}",
          "Total Inflows": "Total Inflows",
          alertMessageTotal: "Total outflows cannot exceed total inflows!",
          alertMessageChild:
            "Child outflows cannot exceed the value of their parent outflow!",
            noData: "No data to display",
            retry: "Retry",
            loading: "Loading...",
            alertMessageInflow:"Inflow should be greater than outflow"
        },
      },
      fr: {
        translation: {
          title: "Bonjour",
          SalaryExpenditure: "Salaire et Dépenses",
          UpdateInflowOutflow: "Mettre à jour les flux entrants et sortants",
          Add: "Ajouter",
          edit: "Éditer",
          delete: "Supprimer",
          AddOutflowkps: "Ajouter des ruptures d'écoulement",
          Outflows: "Sorties",
          Inflows: "Entrées",
          AddOutflow: "Ajouter un flux sortant",
          AddInflow: "Ajouter un flux entrant",
          Name: "Nom",
          Value: "Valeur",
          Details: "Détails",
          ChildName: "Nom de l'enfant",
          ChildValue: "Valeur de l'enfant",
          Save: "Sauvegarder",
          Cancel: "Annuler",
          deleteText: "Êtes-vous sûr de vouloir supprimer",
          "Add {{category}}": "Ajouter {{Outflows}}",
          "Total Inflows": "Entrées totales",
          alertMessageTotal:
            "Le total des sorties ne peut pas dépasser le total des entrées !",
          alertMessageChild:
            "Les sorties enfants ne peuvent pas dépasser la valeur de leur sortie parent !",
          noData: "Aucune donnée à afficher",
          retry: "Réessayer",
          loading: "Chargement...",
          alertMessageInflow:"Les entrées devraient être supérieures aux sorties."
        },
      },
    },
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: { escapeValue: false }, // React already escapes values
  });

export default i18n;
