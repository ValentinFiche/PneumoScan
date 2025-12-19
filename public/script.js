document
  .getElementById("uploadForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const resultDiv = document.getElementById("result");
    const chartContainer = document.getElementById("chartContainer");
    const ctx = document.getElementById("resultChart").getContext("2d");
    const processingTimeDiv = document.getElementById("processingTime");
    resultDiv.textContent = "Processing...";

    const formData = new FormData();
    const fileField = document.getElementById("xrayImage");

    formData.append("xray", fileField.files[0]);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log(result);
      // result.processing_time rounded to 2 decimal places
      processingTimeDiv.textContent = `Processing time: ${Math.round(result.processing_time * 100) / 100} seconds.`;
      resultDiv.textContent = `Result: ${result.result}`;

      const chartData = {
        labels: ["Normal", "Pneumonia"],
        datasets: [
          {
            label: "Probability",
            data: result.probabilities,
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(255, 99, 132, 0.2)",
            ],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      };

      if (window.myChart) {
        window.myChart.destroy();
      }

      window.myChart = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      if (result.result === "PNEUMONIA" && result.type) {
        const typeDiv = document.createElement("div");
        typeDiv.textContent = `Type: ${result.type}`;
        resultDiv.appendChild(typeDiv);

        const typeChartData = {
          labels: ["Bacteria", "Virus", "Unknown"],
          datasets: [
            {
              label: "Type",
              data: [
                result.type === "bacteria" ? 1 : 0,
                result.type === "virus" ? 1 : 0,
                result.type === "unknown" ? 1 : 0,
              ],
              backgroundColor: [
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        };

        const typeChartContainer = document.getElementById("typeChartContainer");
        typeChartContainer.style.display = "block";
        
        const typeCtx = document.getElementById("typeChart").getContext("2d");

        new Chart(typeCtx, {
          type: "bar",
          data: typeChartData,
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                },
              },
            },
          },
        });
      }

      chartContainer.style.display = "block";
    } catch (error) {
      resultDiv.textContent = "Error processing the image.";
      console.error("Error:", error);
    }
  });
