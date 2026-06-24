/**
 * LUMINA Face Art — Google Form za privolu fotografija
 *
 * NE TREBA "Google Forms API" u Services meniju.
 * Jednom uključi API u Google Cloudu (korak ispod), pa pokreni skriptu.
 *
 * === JEDNOM: UKLJUČI FORMS API ===
 * 1. Apps Script → ⚙️ Project settings (lijevo dolje)
 * 2. Kopiraj "Project number" (npr. 123456789012)
 * 3. Otvori u browseru (zamijeni BROJ):
 *    https://console.cloud.google.com/apis/library/forms.googleapis.com?project=BROJ
 * 4. Klikni ENABLE / OMOGUĆI
 * 5. Vrati se u Apps Script → Run → createLuminaConsentForm
 *
 * === POKRETANJE ===
 * 1. script.google.com → New project
 * 2. Zalijepi ovaj kod
 * 3. View → Show app manifest file → provjeri oauthScopes (dolje u komentaru)
 * 4. Run → createLuminaConsentForm
 * 5. Odobri dozvole
 * 6. View → Logs → kopiraj Published URL → lib/profile.ts → consentFormUrl
 *
 * appsscript.json (ako treba ručno dodati scopeove):
 * {
 *   "timeZone": "Europe/Zagreb",
 *   "exceptionLogging": "STACKDRIVER",
 *   "runtimeVersion": "V8",
 *   "oauthScopes": [
 *     "https://www.googleapis.com/auth/forms.body",
 *     "https://www.googleapis.com/auth/drive",
 *     "https://www.googleapis.com/auth/spreadsheets"
 *   ]
 * }
 */

function createLuminaConsentForm() {
  const formTitle = "Privola za objavu fotografija — LUMINA Face Art";
  const formDescription =
    "Ovaj obrazac služi za davanje privole za fotografiranje i/ili objavu fotografija nastalih tijekom oslikavanja lica ili događaja u organizaciji LUMINA Face Art.\n\n" +
    "Privola se daje dobrovoljno i može se povući u bilo kojem trenutku kontaktom na lumina.faceart@gmail.com.\n\n" +
    "Molimo roditelja/skrbnika da jasno označi za što daje privolu.";

  const spreadsheetName = "LUMINA Face Art — Privola odgovori";
  const spreadsheet = SpreadsheetApp.create(spreadsheetName);

  var created;
  try {
    created = formsApi_("post", "forms", {
      info: {
        title: formTitle,
        documentTitle: "LUMINA Privola",
      },
    });
  } catch (e) {
    Logger.log("GREŠKA pri kreiranju forme:");
    Logger.log(e.message);
    Logger.log("");
    Logger.log("=== RJEŠENJE ===");
    Logger.log("1. Project settings → kopiraj Project number");
    Logger.log("2. Otvori: https://console.cloud.google.com/apis/library/forms.googleapis.com");
    Logger.log("3. Odaberi isti GCP projekt kao Apps Script");
    Logger.log("4. Klikni ENABLE");
    Logger.log("5. Ponovi Run");
    Logger.log("");
    Logger.log("ILI ručno: Extensions u Google Sheets nije potreban.");
    Logger.log("Tablica je kreirana: " + spreadsheet.getUrl());
    throw e;
  }

  const formId = created.formId;
  const requests = [];
  var index = 0;

  function pushItem(item) {
    requests.push({
      createItem: {
        item: item,
        location: { index: index++ },
      },
    });
  }

  pushItem(textItem_("Ime i prezime roditelja/skrbnika", true));
  pushItem(textItem_("Ime i prezime djeteta", true));
  pushItem(
    textItem_("Kontakt roditelja/skrbnika", true, "Mobitel ili e-mail")
  );
  pushItem(dateItem_("Datum događaja", true));
  pushItem(textItem_("Naziv događaja / rođendana", false));

  [
    "Dopuštam fotografiranje oslikavanja lica mog djeteta",
    "Dopuštam objavu fotografija na Lumina web stranici",
    "Dopuštam objavu fotografija na Instagram/Facebook profilu LUMINA Face Art",
    "Dopuštam objavu fotografija na kojima je lice djeteta prepoznatljivo",
    "Dopuštam samo objavu detalja oslikavanja bez prepoznatljivog lica",
  ].forEach(function (title) {
    pushItem(choiceItem_(title, true));
  });

  pushItem(paragraphItem_("Napomena roditelja/skrbnika", false));
  pushItem(
    checkboxItem_(
      "Potvrđujem da sam roditelj/skrbnik navedenog djeteta i da razumijem za što dajem privolu",
      ["Da, potvrđujem"],
      true
    )
  );

  requests.push({
    updateFormInfo: {
      info: { description: formDescription },
      updateMask: "description",
    },
  });

  requests.push({
    updateSettings: {
      settings: {
        emailCollectionType: "DO_NOT_COLLECT",
        limitOneResponsePerUser: false,
        confirmationMessage: {
          text: "Hvala! Vaša privola je zaprimljena.",
        },
      },
      updateMask:
        "emailCollectionType,limitOneResponsePerUser,confirmationMessage.text",
    },
  });

  formsApi_("post", "forms/" + formId + ":batchUpdate", { requests: requests });

  var editUrl;
  var publishedUrl;
  var spreadsheetUrl = spreadsheet.getUrl();

  try {
    const form = FormApp.openById(formId);
    form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
    form.setCollectEmail(false);
    form.setLimitOneResponsePerUser(false);
    editUrl = form.getEditUrl();
    publishedUrl = form.getPublishedUrl();
  } catch (linkError) {
    editUrl = "https://docs.google.com/forms/d/" + formId + "/edit";
    publishedUrl =
      created.responderUri ||
      "https://docs.google.com/forms/d/" + formId + "/viewform";
    Logger.log(
      "Napomena: forma je kreirana, ali automatsko povezivanje s tablicom nije uspjelo."
    );
    Logger.log(
      "Ručno: otvori formu → Responses → Link to Sheets → odaberi tablicu:"
    );
    Logger.log(spreadsheetUrl);
  }

  try {
    DriveApp.getFileById(formId).setName(formTitle);
  } catch (nameError) {
    // Naziv u Driveu nije kritičan
  }

  Logger.log("=== LUMINA Face Art — forma kreirana ===");
  Logger.log("");
  Logger.log("EDIT URL (samo vlasnica):");
  Logger.log(editUrl);
  Logger.log("");
  Logger.log("PUBLISHED URL (stavi u consentFormUrl):");
  Logger.log(publishedUrl);
  Logger.log("");
  Logger.log("SPREADSHEET URL (odgovori):");
  Logger.log(spreadsheetUrl);

  return {
    editUrl: editUrl,
    publishedUrl: publishedUrl,
    spreadsheetUrl: spreadsheetUrl,
  };
}

/**
 * Pozovi ovu funkciju ako API i dalje ne radi — ispisuje točne korake za ručno kreiranje.
 */
function luminaConsentFormManualGuide() {
  Logger.log("=== RUČNO KREIRANJE FORME (5–10 min) ===");
  Logger.log("");
  Logger.log("1. Otvori https://forms.google.com → Blank form");
  Logger.log("2. Naslov: Privola za objavu fotografija — LUMINA Face Art");
  Logger.log("3. Dodaj pitanja iz README.md (sekcija Online privola)");
  Logger.log("4. Settings → Make this a quiz: OFF");
  Logger.log("5. Settings → Collect email addresses: OFF");
  Logger.log("6. Settings → Limit to 1 response: OFF");
  Logger.log("7. Responses → Link to Sheets → nova tablica");
  Logger.log("8. Send → link ikona → kopiraj link");
  Logger.log("9. Zalijepi u lib/profile.ts → consentFormUrl");
}

function formsApi_(method, path, payload) {
  const url = "https://forms.googleapis.com/v1/" + path;
  const options = {
    method: method,
    contentType: "application/json",
    headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
    muteHttpExceptions: true,
  };

  if (payload) {
    options.payload = JSON.stringify(payload);
  }

  const response = UrlFetchApp.fetch(url, options);
  const code = response.getResponseCode();
  const text = response.getContentText();

  if (code < 200 || code >= 300) {
    var hint = "";
    if (code === 403 && text.indexOf("forms.googleapis.com") !== -1) {
      hint =
        " → Uključi Google Forms API u Cloud Console (vidi upute na vrhu skripte).";
    }
    throw new Error("Forms API " + code + ": " + text + hint);
  }

  return text ? JSON.parse(text) : {};
}

function textItem_(title, required, description) {
  const item = {
    title: title,
    questionItem: {
      question: {
        required: required,
        textQuestion: { paragraph: false },
      },
    },
  };

  if (description) {
    item.description = description;
  }

  return item;
}

function dateItem_(title, required) {
  return {
    title: title,
    questionItem: {
      question: {
        required: required,
        dateQuestion: {
          includeTime: false,
          includeYear: true,
        },
      },
    },
  };
}

function paragraphItem_(title, required) {
  return {
    title: title,
    questionItem: {
      question: {
        required: required,
        textQuestion: { paragraph: true },
      },
    },
  };
}

function choiceItem_(title, required) {
  return {
    title: title,
    questionItem: {
      question: {
        required: required,
        choiceQuestion: {
          type: "RADIO",
          options: [{ value: "Da" }, { value: "Ne" }],
        },
      },
    },
  };
}

function checkboxItem_(title, options, required) {
  return {
    title: title,
    questionItem: {
      question: {
        required: required,
        choiceQuestion: {
          type: "CHECKBOX",
          options: options.map(function (value) {
            return { value: value };
          }),
        },
      },
    },
  };
}
