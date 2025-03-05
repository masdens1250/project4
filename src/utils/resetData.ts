export const resetApplicationData = () => {
  // Suppression des données d'authentification
  localStorage.removeItem('isAuthenticated');
  
  // Suppression des paramètres de l'école
  localStorage.removeItem('schoolSettings');
  
  // Suppression des données du rapport de guidage
  localStorage.removeItem('guidanceReportData');
  
  // Suppression de toutes les autres données
  localStorage.clear();
  
  // Retourner true pour confirmer que la réinitialisation est terminée
  return true;
};