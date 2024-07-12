import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Spin,
  Progress,
  Select,
  Typography,
  Checkbox,
} from "antd";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import moment from "moment";
import "moment/locale/fr"; // Import the French locale
import config from "../../../../config";

moment.locale("fr"); // Set the locale to French

const { Title } = Typography;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

const months = [
  { name: "Toute l'année", value: 0 },
  { name: "Janvier", value: 1 },
  { name: "Février", value: 2 },
  { name: "Mars", value: 3 },
  { name: "Avril", value: 4 },
  { name: "Mai", value: 5 },
  { name: "Juin", value: 6 },
  { name: "Juillet", value: 7 },
  { name: "Août", value: 8 },
  { name: "Septembre", value: 9 },
  { name: "Octobre", value: 10 },
  { name: "Novembre", value: 11 },
  { name: "Décembre", value: 12 },
];

const years = Array.from({ length: 10 }, (_, i) => moment().year() - 5 + i);

const options = [
  { label: "Validé", value: "validé" },
  { label: "En Attente", value: "en_attente" },
  { label: "Refusé", value: "refusé" },
  { label: "Ventes", value: "ventes" },
];

const Dashboard2 = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(0); // 0 for the whole year
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [selectedLines, setSelectedLines] = useState([
    "validé",
    "en_attente",
    "refusé",
    "ventes",
  ]);

  useEffect(() => {
    fetchReservations(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  const fetchReservations = (month, year) => {
    setLoading(true);

    let params = { year };
    if (month !== 0) {
      params.month = month;
    }

    axios
      .get(`${config.API_URL}/reservations`, {
        params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const sortedReservations = response.data.sort((a, b) =>
          moment(b.date_debut).diff(moment(a.date_debut))
        );
        setReservations(sortedReservations);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des réservations!",
          error
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const totalSales = reservations
    .filter((res) => res.etat === "validé")
    .reduce((total, res) => total + parseFloat(res.prix_estime), 0);

  const reservationsByState = reservations.reduce((acc, res) => {
    acc[res.etat] = (acc[res.etat] || 0) + 1;
    return acc;
  }, {});

  const validReservations = reservationsByState["validé"] || 0;
  const pendingReservations = reservationsByState["en attente"] || 0;
  const refusedReservations = reservationsByState["refusé"] || 0;

  // Prepare data for the chart
  const chartData = reservations.map((res) => ({
    date: moment(res.date_debut).format("LL"),
    validé: res.etat === "validé" ? 1 : 0,
    en_attente: res.etat === "en attente" ? 1 : 0,
    refusé: res.etat === "refusé" ? 1 : 0,
    ventes: res.etat === "validé" ? parseFloat(res.prix_estime) : 0,
  }));

  const handleCheckboxChange = (checkedValues) => {
    setSelectedLines(checkedValues);
  };

  if (loading) {
    return <Spin tip="Chargement..." />;
  }

  return (
    <div style={{ padding: 24, minHeight: 360 }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Title level={4}>Sélectionnez un mois et une année</Title>
            <Select
              value={selectedMonth}
              onChange={setSelectedMonth}
              style={{ width: 160, marginRight: 10 }}
            >
              {months.map((month) => (
                <Option key={month.value} value={month.value}>
                  {month.name}
                </Option>
              ))}
            </Select>
            <Select
              value={selectedYear}
              onChange={setSelectedYear}
              style={{ width: 120 }}
            >
              {years.map((year) => (
                <Option key={year} value={year}>
                  {year}
                </Option>
              ))}
            </Select>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col>
          <Card>
            <Statistic
              title="Ventes Totales"
              value={totalSales.toFixed(2)}
              prefix="€"
            />
          </Card>
        </Col>
        <Col>
          <Card>
            <Statistic
              title="Nombre Total de Réservations"
              value={reservations.length}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col>
          <Card>
            <Title level={4}>Réservations Validées</Title>
            <Progress
              type="circle"
              percent={100}
              format={() => validReservations}
              strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
            />
          </Card>
        </Col>
        <Col>
          <Card>
            <Title level={4}>Réservations En Attente</Title>
            <Progress
              type="circle"
              percent={100}
              format={() => pendingReservations}
              strokeColor={{ "0%": "#ffbb33", "100%": "#ff8800" }}
            />
          </Card>
        </Col>
        <Col>
          <Card>
            <Title level={4}>Réservations Refusées</Title>
            <Progress
              type="circle"
              percent={100}
              format={() => refusedReservations}
              strokeColor={{ "0%": "#ff4d4f", "100%": "#ff0000" }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card>
            <Title level={4}>Données Mensuelles</Title>
            <CheckboxGroup
              options={options}
              defaultValue={["validé", "en_attente", "refusé", "ventes"]}
              onChange={handleCheckboxChange}
            />
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {selectedLines.includes("validé") && (
                  <Line type="monotone" dataKey="validé" stroke="#87d068" />
                )}
                {selectedLines.includes("en_attente") && (
                  <Line type="monotone" dataKey="en_attente" stroke="#ff8800" />
                )}
                {selectedLines.includes("refusé") && (
                  <Line type="monotone" dataKey="refusé" stroke="#ff0000" />
                )}
                {selectedLines.includes("ventes") && (
                  <Line type="monotone" dataKey="ventes" stroke="#108ee9" />
                )}
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard2;
