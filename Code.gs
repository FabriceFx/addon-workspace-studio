/**
 * Ce script définit une étape personnalisée pour Google Workspace Studio.
 * L'étape, nommée "Envoyer WhatsApp", prend un numéro de téléphone et un corps
 * de message en entrée, puis exécute l'envoi via l'API de messagerie.
 *
 * Le script comprend des fonctions pour :
 *
 * 1. Définir l'interface utilisateur (UI) de configuration via des objets Card :
 *
 * - `onConfigSendWhatsApp()` : Génère la carte de configuration principale.
 * - Fonctions utilitaires telles que `pushCard()`, `saveButton()` pour construire
 * les composants de la carte.
 *
 * 2. Gérer l'exécution de l'étape :
 *
 * - `onExecuteSendWhatsApp()` : Récupère les entrées, effectue l'appel API
 * vers le service de messagerie et renvoie les variables de sortie.
 *
 * Pour en savoir plus, consultez le guide de démarrage rapide suivant :
 * https://developers.google.com/workspace/add-ons/studio/quickstart
 */

/**
 * Creates an action response to push a new card onto the card stack.
 *
 * @param {Object} card The Card object to push.
 * @return {Object} The action response object.
 */
function pushCard(card) {
    return {

        "action": {
            "navigations": [{
                "push_card": card
            }
            ]
        }
    };
}

/**
 * Creates an action response to update the currently displayed card.
 *
 * @param {Object} card The Card object to update.
 * @return {Object} The render actions object.
 */
function updateCard(card) {
    return {
        "render_actions": {
            "action": {
                "navigations": [{
                    "update_card": card
                }
                ]
            }
        }
    };
}

/**
 * Creates a button configuration object for saving the step.
 *
 * @return {Object} The button widget object.
 */
function saveButton() {
    return {
        "text": "Enregistrer",
        "onClick": {
            "hostAppAction": {
                "workflowAction": {
                    "saveWorkflowAction": {}
                }
            }
        },
    };
}

/**
 * Creates a button configuration object for a refresh action.
 *
 * @param {string} functionName The name of the Apps Script function to call on click.
 * @return {Object} The button widget object.
 */
function refreshButton(functionName) {
    return {
        "text": "Rafraîchir",
        "onClick": {
            "action": {
                "function": functionName
            }
        },
    };
}


// ============================================================
// CONFIGURATION DE L'ÉTAPE (UI)
// ============================================================

/**
 * Génère et affiche la carte de configuration de l'étape "Envoyer WhatsApp".
 *
 * Cette fonction crée une carte avec les champs de saisie pour le numéro
 * de téléphone et le contenu du message. Les champs sont configurés pour
 * permettre la sélection de variables des étapes précédentes du flux
 * via la propriété `hostAppDataSource`.
 *
 * Cette fonction est appelée lorsque l'utilisateur ajoute ou modifie
 * l'étape "Envoyer WhatsApp" dans l'interface de Studio.
 *
 * @return {Object} L'objet de réponse contenant la carte à afficher.
 */
function onConfigSendWhatsApp() {
    var card = {
        "sections": [
            {
                "header": "Envoyer un message WhatsApp",
                "widgets": [
                    {
                        "textInput": {
                            "name": "recipient_phone",
                            "label": "Numéro du destinataire",
                            "hintText": "Ex: +33612345678",
                            "hostAppDataSource": {
                                "workflowDataSource": {
                                    "includeVariables": true
                                }
                            }
                        }
                    },
                    {
                        "textInput": {
                            "name": "message_body",
                            "label": "Contenu du message",
                            "type": "MULTIPLE_LINE",
                            "hostAppDataSource": {
                                "workflowDataSource": {
                                    "includeVariables": true
                                }
                            }
                        }
                    }
                ]
            }
        ]
    };
    return pushCard(card);
}


// ============================================================
// EXÉCUTION DE L'ÉTAPE
// ============================================================

/**
 * Retourne les variables de sortie d'une étape.
 *
 * @param {Object} variableDataMap Un objet { clé: VariableData }.
 * @return {RenderAction} L'action contenant les variables de sortie.
 */
function outputVariables(variableDataMap) {
    const workflowAction = AddOnsResponseService.newReturnOutputVariablesAction()
        .setVariableDataMap(variableDataMap);

    const hostAppAction = AddOnsResponseService.newHostAppAction()
        .setWorkflowAction(workflowAction);

    const renderAction = AddOnsResponseService.newRenderActionBuilder()
        .setHostAppAction(hostAppAction)
        .build();

    return renderAction;
}

/**
 * Exécute l'étape "Envoyer WhatsApp" lors du déclenchement du flux.
 *
 * Récupère les entrées configurées, appelle l'API de messagerie,
 * et retourne les variables de sortie pour la suite du flux.
 *
 * @param {Object} event L'objet événement fourni par Workspace Studio.
 * @return {Object} Les variables de sortie.
 */
function onExecuteSendWhatsApp(event) {
    console.log("output: " + JSON.stringify(event));

    var phone = event.workflow.actionInvocation.inputs["recipient_phone"].stringValues[0];
    var body = event.workflow.actionInvocation.inputs["message_body"].stringValues[0];

    // Appel API vers le service de messagerie WhatsApp
    // ⚠️ Remplacez l'URL et la clé API par vos valeurs réelles
    var apiUrl = "https://api.votre-service.com/v1/send";
    var options = {
        "method": "post",
        "contentType": "application/json",
        "headers": { "Authorization": "Bearer VOTRE_CLE_API" },
        "payload": JSON.stringify({ "to": phone, "message": body }),
        "muteHttpExceptions": true
    };

    try {
        var response = UrlFetchApp.fetch(apiUrl, options);
        var result = JSON.parse(response.getContentText());

        const variableDataMap = {
            "status": AddOnsResponseService.newVariableData().addStringValue("Success"),
            "message_id": AddOnsResponseService.newVariableData().addStringValue(result.id || "N/A")
        };
        return outputVariables(variableDataMap);

    } catch (e) {
        const errorMap = {
            "status": AddOnsResponseService.newVariableData().addStringValue("Error: " + e.message)
        };
        return outputVariables(errorMap);
    }
}

// ============================================================
// UTILITAIRES
// ============================================================

/**
 * Prépare et retourne les variables de sortie pour le flux Workspace Studio.
 *
 * @param {Object} variableDataMap Un objet { clé: VariableData }.
 * @return {RenderAction} L'action contenant les variables de sortie.
 */
function outputVariables(variableDataMap) {
    const workflowAction = AddOnsResponseService.newReturnOutputVariablesAction()
        .setVariableDataMap(variableDataMap);

    const hostAppAction = AddOnsResponseService.newHostAppAction()
        .setWorkflowAction(workflowAction);

    const renderAction = AddOnsResponseService.newRenderActionBuilder()
        .setHostAppAction(hostAppAction)
        .build();

    return renderAction;
}