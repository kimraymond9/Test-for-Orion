import React from "react";
import { Bar } from "react-chartjs-2";

import COLORS from "../colors.js";

const TopLevelDomains = props => {
  const topLevelDomains = [];
  const topLevelDomainsForEmail = [];
  let domainFrequencies = {};
  let domainFrequenciesForEmail = {};

  props.data.forEach(contact => {
    topLevelDomains.push(`.${contact.website.split(".").pop()}`);
    topLevelDomainsForEmail.push(`.${contact.email.split(".").pop()}`); // getting all top level domains from emails and websites
  });

  const uniqueDomains = topLevelDomains.filter((elem, index, self) => {
    return index === self.indexOf(elem); // gets all unique top level domains
  });

  const uniqueDomainsForEmail = topLevelDomainsForEmail.filter(
    (elem, index, self) => {
      return index === self.indexOf(elem);
    }
  );

  // eslint-disable-next-line no-sequences
  domainFrequencies = uniqueDomains.reduce((a, b) => ((a[b] = 0), a), {}); // converts array of domains into an object
  // eslint-disable-next-line no-sequences
  domainFrequenciesForEmail = uniqueDomainsForEmail.reduce(
    // eslint-disable-next-line no-sequences
    (a, b) => ((a[b] = 0), a),
    {}
  );

  props.data.forEach(contact => {
    domainFrequencies[`.${contact.website.split(".").pop()}`] += 1; // getting counts for each domain
    domainFrequenciesForEmail[`.${contact.email.split(".").pop()}`] += 1;
  });

  const emailDomain = {
    labels: Object.keys(domainFrequenciesForEmail),
    datasets: [
      {
        label: "Email",
        backgroundColor: COLORS.PRIMARY_COLOR,
        borderWidth: 1,
        hoverBackgroundColor: COLORS.PRIMARY_COLOR,
        hoverBorderColor: COLORS.PRIMARY_COLOR,
        data: Object.values(domainFrequenciesForEmail)
      }
    ]
  };

  const websiteDomain = {
    labels: Object.keys(domainFrequencies),
    datasets: [
      {
        label: "Website",
        backgroundColor: COLORS.SECONDARY_COLOR,
        borderWidth: 1,
        hoverBackgroundColor: COLORS.SECONDARY_COLOR,
        hoverBorderColor: COLORS.SECONDARY_COLOR,
        data: Object.values(domainFrequencies)
      }
    ]
  };

  const emailDomainOptions = {
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Top-Level Domain"
          }
        }
      ],
      yAxes: [
        {
          display: true,
          labelString: "Frequency",
          scaleLabel: {
            display: true,
            labelString: "Frequency"
          },
          ticks: {
            min: 0,
            stepSize: 1
          }
        }
      ]
    }
  };

  const websiteDomainOptions = {
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Top-Level Domain"
          }
        }
      ],
      yAxes: [
        {
          display: true,
          labelString: "Frequency",
          scaleLabel: {
            display: true,
            labelString: "Frequency"
          },
          ticks: {
            min: 0,
            stepSize: 1
          }
        }
      ]
    }
  };

  return (
    <div className="topLevelDomains">
      <div className="barGraph" data-testid="bar-graph-domain">
        <Bar data={emailDomain} options={emailDomainOptions} />
      </div>
      <div className="barGraph">
        <Bar data={websiteDomain} options={websiteDomainOptions} />
      </div>
    </div>
  );
};

export default TopLevelDomains;
