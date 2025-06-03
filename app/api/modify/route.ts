import { NextRequest, NextResponse } from "next/server";
// Updated import to use KV functions
import { getBooking } from "../../../lib/bookingStore";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new NextResponse("<p style='color:red;'>Hiányzó ID.</p>", {
      headers: { "Content-Type": "text/html" },
    });
  }

  // Get booking from Vercel KV
  const foglalas = await getBooking(id);
  if (!foglalas) {
    return new NextResponse(
      "<p style='color:red;'>Foglalás nem található.</p>",
      { headers: { "Content-Type": "text/html" } }
    );
  }

  // Construct the base URL for the form action
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

  if (foglalas.modificationSent) {
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Módosítás már elküldve</title>
          <style>
              body { font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; text-align: center; background-color: #0e0e0e; color: #ffffff; }
              h2 { color: #f47b20; }
              p { margin: 20px 0; }
              .error { color: red; }
              button { background: #f47b20; color: white; border: none; padding: 10px 15px; cursor: pointer; border-radius: 4px; }
              button:hover { background: #e06a10; }
          </style>
      </head>
      <body>
          <h2>Módosítási javaslat már elküldve</h2>
          <p class="error">Már küldtél egy módosítási javaslatot ehhez a foglaláshoz.</p>
          <p>Eredeti időpont: ${foglalas.originalDate} ${foglalas.originalTime}</p>
          <p>Javasolt időpont: ${foglalas.newDate} ${foglalas.newTime}</p>
          <p>Kérjük várj az ügyfél válaszára.</p>
          <p><button onclick="window.close()">Bezárás</button></p>
      </body>
      </html>
    `,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  const now = new Date();
  const currentHour = now.getHours();
  const currentDate = now.toISOString().split("T")[0];

  let minDate = currentDate;
  if (currentHour >= 16) {
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    minDate = tomorrow.toISOString().split("T")[0];
  }

  let timeOptions = "";
  for (let h = 9; h <= 16; h++) {
    // For the modification form, allow suggesting same-day times if it's not past,
    // or if it is past, only allow future times.
    // This logic might need refinement based on exact requirements for modification lead time.
    if (
      currentDate === minDate &&
      h <= currentHour &&
      new Date(minDate).getDate() === now.getDate()
    )
      continue;
    timeOptions += `<option value="${h}">${h}:00</option>`;
  }

  return new NextResponse(
    `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Időpont módosítása</title>
        <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #0e0e0e; color: #ffffff; }
            h2 { color: #f47b20; }
            label { display: block; margin: 10px 0 5px; color: #f47b20; }
            input, select { width: 100%; padding: 8px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 4px; background-color: #1a1a1a; color: #ffffff; }
            button { background: #f47b20; color: #0e0e0e; border: none; padding: 10px 15px; cursor: pointer; border-radius: 4px; font-weight: bold; }
            button:hover { background: #e06a10; }
            .time-container { display: flex; gap: 10px; }
            .time-container select { width: 50%; }
            .info { background: #1a1a1a; padding: 10px; border-radius: 4px; margin-bottom: 15px; border-left: 3px solid #f47b20; }
        </style>
    </head>
    <body>
        <h2>Ajánlj új időpontot</h2>
        <div class="info">
            <p><strong>Eredeti foglalás:</strong></p>
            <p>Dátum: ${foglalas.originalDate}</p>
            <p>Idő: ${foglalas.originalTime}</p>
        </div>
        <form action="${baseUrl}/api/propose-change" method="POST">
            <input type="hidden" name="id" value="${id}" />
            <label for="newDate">Új dátum:</label>
            <input type="date" name="newDate" id="newDate" min="${minDate}" required />
            <label for="newFrom">Új idő:</label>
            <div class="time-container">
                <select name="newFrom" id="newFrom" required onchange="updateToOptions()">
                    ${timeOptions}
                </select>
                <select name="newTo" id="newTo" required></select>
            </div>
            <button type="submit">Küldés</button>
        </form>

        <script>
            function updateToOptions() {
                const fromSelect = document.getElementById('newFrom');
                const toSelect = document.getElementById('newTo');
                const selectedFrom = parseInt(fromSelect.value);
                
                toSelect.innerHTML = '';
                if (!isNaN(selectedFrom)) {
                    for (let h = selectedFrom + 1; h <= 17; h++) {
                        const opt = document.createElement('option');
                        opt.value = h;
                        opt.textContent = h + ':00';
                        toSelect.appendChild(opt);
                    }
                    if (toSelect.options.length > 0) {
                       toSelect.value = toSelect.options[0].value;
                    }
                }
            }
            
            document.addEventListener('DOMContentLoaded', function() {
                const newDateInput = document.getElementById('newDate');
                newDateInput.value = '${minDate}'; // Pre-fill with minDate
                updateToOptions(); // Initial call to populate To options

                newDateInput.addEventListener('change', function() {
                    const now = new Date();
                    const selectedDateValue = this.value;
                    const isToday = now.toISOString().split("T")[0] === selectedDateValue;
                    const currentHour = now.getHours();
                    
                    const fromSelect = document.getElementById('newFrom');
                    const originalFromValue = fromSelect.value;
                    fromSelect.innerHTML = '';
                    
                    let newFromHours = [];
                    for (let h = 9; h <= 16; h++) {
                        if (isToday && h <= currentHour && new Date(selectedDateValue).getDate() === now.getDate()) continue;
                        newFromHours.push(h);
                        const opt = document.createElement('option');
                        opt.value = h;
                        opt.textContent = h + ':00';
                        fromSelect.appendChild(opt);
                    }
                    
                    if (newFromHours.includes(parseInt(originalFromValue))){
                        fromSelect.value = originalFromValue;
                    } else if (fromSelect.options.length > 0) {
                        fromSelect.value = fromSelect.options[0].value;
                    }
                    updateToOptions();
                });
            });
        </script>
    </body>
    </html>
  `,
    { headers: { "Content-Type": "text/html" } }
  );
}
