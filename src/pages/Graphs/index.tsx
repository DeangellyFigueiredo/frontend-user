import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {ToolbarContainer} from '../../components/ToolbarContainer';
import {titleStyle} from '../styles';
import {useEffect, useRef, useState} from 'react';
import {GraphData} from '../../models/graph.model';
import {getGraphData} from '../../services/graph';
import {useToast} from '../../shared/hooks/useToast';
import * as d3 from 'd3';
export function Graphs() {
  const [graphData, setGraphData] = useState<GraphData[]>([]);
  const [roles, setRole] = useState<string[]>([]);
  const [roleSelected, setRoleSelected] = useState<string>('');
  const {actionToast} = useToast();
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    getGraphDataToPlot();
  }, []);

  useEffect(() => {
    if (graphData.length > 0) {
      setRole(getRoles());
    }
  }, [graphData]);

  const getGraphDataToPlot = () => {
    getGraphData()
      .then(response => {
        setGraphData(response.data);
      })
      .catch(error => {
        actionToast({message: error.response.data.message, type: 'error'});
      });
  };

  const getRoles = () => {
    return graphData.map(item => item.role);
  };

  const handleChange = (event: SelectChangeEvent) => {
    cleanGraph();
    setRoleSelected(event.target.value as string);
    gerenateGraph(getDataForSelectedRole(event.target.value as string));
  };

  const cleanGraph = () => {
    d3.select(svgRef.current).selectAll('*').remove();
  };

  function getDataForSelectedRole(selectedRole: string) {
    const selectedData = graphData.find(item => item.role === selectedRole);
    if (selectedData) {
      return [
        selectedData.quantity,
        selectedData.quantityActive,
        selectedData.quantityInactive,
      ];
    } else {
      return [];
    }
  }

  const gerenateGraph = (graphData: number[]) => {
    if (graphData.length === 0) return;
    const svg = d3
      .select(svgRef.current)
      .attr('width', 1000)
      .attr('height', 800);

    const margin = {top: 20, right: 30, bottom: 30, left: 40};
    const width = 400 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const xLegend: string[] = [
      'Quantidade Total, Quantidade Ativos, Quantidade Inativos',
    ];
    const dataQuantity = graphData;
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(
        xLegend.map(function (d) {
          return d;
        }),
      );

    const y = d3
      .scaleLinear()
      .domain([0, dataQuantity[0] + 5])
      .range([height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);
    svg
      .append('g')
      .call(xAxis)
      .attr('class', 'x axis')
      .attr('transform', `translate(30, ${height + 10})`);

    svg
      .append('g')
      .call(yAxis)
      .attr('class', 'y axis')
      .attr('transform', `translate(30, ${10})`);

    svg
      .selectAll('.bar')
      .data(dataQuantity)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', function (d, i) {
        return i * 80;
      })
      .attr('y', function (d) {
        if (d === 0) return 0;
        return height + y(d) - 340;
      })
      .attr('height', function (d) {
        if (d === 0) return 0;
        return height - y(d);
      })
      .attr('transform', `translate(100)`)
      .attr('width', 20)
      .style('fill', function (d, i) {
        return i === 2 ? 'red' : 'steelblue'; // Set color of first rectangle to red
      });
  };

  return (
    <>
      <Typography style={titleStyle}>Gráficos</Typography>
      <FormControl sx={{m: 1, minWidth: 200}}>
        <InputLabel id="demo-simple-select-small-label">
          Nível de Acesso
        </InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={roleSelected}
          label="Nível de Acesso"
          onChange={handleChange}>
          {roles.map(role => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          typography: 'body1',
          paddingTop: '24px',
        }}>
        {graphData.length > 0 && <svg ref={svgRef}></svg>}
      </Box>
    </>
  );
}
